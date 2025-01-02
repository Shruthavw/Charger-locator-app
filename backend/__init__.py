from flask import Blueprint
from src.utilities.enums import Module

charger_locator_blueprint = Blueprint(Module.CHARGER_LOCATOR.value, __name__)

from src.api.charger_locator import charger_locator_routes