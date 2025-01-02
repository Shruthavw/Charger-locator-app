import datetime
import jwt
import time
from src.api import charger_locator
from src.api.charger_locator.charger_locator_models import ChargerLocation
from src.utilities.scripts import create_response
from src.utilities.singleton import CHARGER_DB_CLIENT, OPS_DB_CLIENT, db_client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from src.utilities.enums import Env, environ



def generate_jwt_token(depot_id: str, charger_id: str):
    """
    Generates token with a 1-hour expiration time
    """
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(seconds=5)
    payload = {
        "depot_id": depot_id,
        "charger_id": charger_id,
        "exp": expiration_time
    }

    token = jwt.encode(payload, environ(Env.SECRET_KEY), algorithm="HS256")
    
    return token

depot_id="depot_id"
charger_id="charger_id"

token = generate_jwt_token(depot_id, charger_id)
print(token)

def get_depot_location(depot_id: str, charger_id: str):
    try:
        """
        Takes depotId and returns the location stored in ops console db
        """
        depots_collection = OPS_DB_CLIENT.get_collection("depots")
        depot = depots_collection.find_one({
           "depotId": depot_id
        })
        if not depot:
            return create_response({"error": f"No depot found with depotId {depot_id}"}, 404)
        charger_collection = CHARGER_DB_CLIENT.get_collection("charger")
        charger = charger_collection.find_one({
            "chargerId": charger_id,
            "siteId": depot_id
            })
        if not charger:
            return create_response({"error": f"No charger found with chargerId {charger_id}"}, 404)
        response = {
             "response": {
                  "depotId":depot.get("depotId"),
                  "address":depot.get("depotDetails").get("depotInfo").get("address"),
                  "depotName":depot.get("depotName"),
                  "chargerId":charger.get("chargerId"),
                 }
            }
        return create_response(response, 200)
    except Exception as e:
        return create_response({"error": f"An error occurred: {str(e)}"}, 500)
    
def update_charger_location(charger_location: ChargerLocation):
    """
    Used to update charger location in master-data
    """

    charger_locator_collection = db_client.get_collection("charger-locator")

    charger_locator_collection.update_one({
        "chargerId": charger_location.chargerId,
        "siteId": charger_location.siteId,
    },
    {
        "$set": {
            "location": {
                "type": "Point",
                "coordinates": [charger_location.longitude, charger_location.latitude]
            }
        }
    }, upsert=True)

    return create_response("Updated Successfully", 200)


def send_email(charger_id: str, depot_id: str, email_id: str):
    """
    Sends an email to the specified email address with charger information using SendGrid.
    """

    charger_locator_url = f"http://localhost:3000/charger-locator/{depot_id}/{charger_id}/location?token={token}"
    # Create the email content
    subject = f"Action Required : Requested to Update Charger Location Information for Charger : {charger_id}"
    content = f"""
    Hello, 
    We kindly request you to update the charger location as per the information provided below. 

    Here are the details for Charger: 
    - Charger ID : {charger_id}
    - Depot Id : {depot_id}

    Please follow the steps to ensure a smooth update:

    1. Open the Charger Locator URL
    
    Use the following link to access the charger location update page:
    {charger_locator_url}

    2. Verify the Charger Location
    
    After locating the Charger Location, ensure the Location is correct.

    3. Submit the Update
    
    Once the information is verified, please proceed to submit the update.
    
    If you encounter any issues or have questions, our support team is here to help. You can reach out to us at support@electriphi.io.
    
    Thank you for using our services.
    
    Best regards,
    Ford Pro
    """

    message = Mail(
        from_email=Email('support@electriphi.io'), 
        to_emails=To(email_id),
        subject=subject,
        plain_text_content=Content("text/plain", content)
    )

    # Send the email using SendGrid
    sg = SendGridAPIClient(api_key=environ(Env.SENDGRID_API_KEY))
    # print('message: ', message.get())
    response = sg.client.mail.send.post(request_body=message.get())

    if response.status_code == 202:
        return create_response(f"Email successfully sent to {email_id}", 200)
    else:
        return create_response(f"Failed to send email. Status code: {response.status_code}", 500)