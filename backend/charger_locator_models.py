

from pydantic import BaseModel


class ChargerLocation(BaseModel):
    latitude: float
    longitude: float
    chargerId: str
    siteId: str
