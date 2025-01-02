from fastapi import HTTPException, Request
from fastapi import APIRouter
import jwt
from fpc_python_scripts.logger_manager import LoggerManager
from pydantic import BaseModel
from src.api.charger_locator.charger_locator_models import ChargerLocation
from src.api.charger_locator.charger_locator_operations import generate_jwt_token, get_depot_location, send_email, update_charger_location
from src.utilities.enums import Module
from src.custom_logger.logger import handleRequest, handleError, handleResponse
from src.utilities.enums import Env, environ



class SendEmailBody(BaseModel):
    charger_id: str
    depot_id: str
    email_id: str


router = APIRouter(prefix="/charger-locator")
logger = LoggerManager(__name__)




@router.get(
    path="/{depotId}/{chargerId}/location",
    tags=["Charger Locator"]
)

async def get_depot_location_route(depotId: str, chargerId: str, request: Request):
    try:
        # Generate a unique request ID for logging
        request_id = handleRequest(logger, request)

        # Generate a JWT token for the depot and charger ID
        token = generate_jwt_token(depotId, chargerId)
        
        # print(f"Generated Token: {token}")

        # Construct the URL with the token as a query parameter
        url = f"http://127.0.0.1:8000/{depotId}/{chargerId}/location?token={token}"

        # Decode and verify the token
        decoded_token = jwt.decode(token, environ(Env.SECRET_KEY), algorithms=["HS256"])
        # print(f"Decoded Token: {decoded_token}")

        # Check if the token payload matches the provided depotId and chargerId
        if decoded_token.get("depot_id") != depotId or decoded_token.get("charger_id") != chargerId:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        # Call the function to get depot location 
        response = get_depot_location(depot_id=depotId, charger_id=chargerId)

        return handleResponse(logger, response, request_id)
    
    except jwt.ExpiredSignatureError:
        # Token has expired
        raise HTTPException(status_code=401, detail="Token has expired. Please generate a new token and try again.")
    except jwt.InvalidTokenError:
        # Invalid token 
        raise HTTPException(status_code=401, detail="Invalid token. Please check your credentials and try again.")
    except Exception as e:
        # Handle other exceptions, such as network errors or other unknown errors
        return handleError(logger, e, request_id)

@router.put(
    path="/location",
    tags=[Module.CHARGER_LOCATOR.value],
)
# @add_security_bypass()
async def update_charger_location_route(request: Request, charger_location: ChargerLocation):
    """To update the location of chargers"""
    try:
        request_id = handleRequest(logger, request)
        response = update_charger_location(charger_location=charger_location)
        return handleResponse(logger, response, request_id)
    except Exception as e:
        return handleError(logger, e, request_id)
    
    
@router.post(
    path="/send-email",
    tags=["Charger Locator"],
)
async def send_charger_email_route(request: Request, body: SendEmailBody):
    """
    Sends an email with charger information using SendGrid.
    
    """
    try:
        # Generate a unique request ID for logging
        request_id = handleRequest(logger, request)

        # Retrieve the JSON body from the request
        print(f"Request Body: {body}")


        # Extract `chargerId` and `emailId` from the JSON payload
        charger_id = body.charger_id
        depot_id = body.depot_id
        email_id = body.email_id

        # Validate that `chargerId` and `emailId` are provided
        if not charger_id or not email_id:
            raise HTTPException(status_code=400, detail="Missing chargerId or emailId in request body")

        # Call the send_email function defined in operations.py
        response = send_email(charger_id=charger_id, depot_id=depot_id, email_id=email_id)

        return handleResponse(logger, response, request_id)
    except Exception as e:
        print('e: ', e)
        return handleError(logger, e, request_id)
    