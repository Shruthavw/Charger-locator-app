from enum import Enum
import os


class Env(Enum):
    PORT = "PORT"
    HOST = "HOST"
    DATABASE = "DATABASE"
    OPS_CONSOLE_DATABSE = "OPS_CONSOLE_DATABSE"
    MONGO_URL = "MONGO_URL"
    OPS_CONSOLE_MONGO_URL = "OPS_CONSOLE_MONGO_URL"
    X_API_SECRET_KEY = "X_API_SECRET_KEY"
    UTILITY_PREFIX = "UTILITY_PREFIX"
    MASTER_DATA_SERVICE_URL = "MASTER_DATA_SERVICE_URL"
    DOMAIN = "DOMAIN"
    MASTER_DATA_SERVICE_API_URL = "MASTER_DATA_SERVICE_API_URL"
    DYNAMIC_PRICE_DEPOT_IDs ="DYNAMIC_PRICE_DEPOT_IDs"
    DYNAMIC_PRICE_PLAN_META_ID="DYNAMIC_PRICE_PLAN_META_ID"
    GENERIC_CHARGER_META_ID="GENERIC_CHARGER_META_ID"
    GENERIC_CHARGER_SOLD_AS_ID="GENERIC_CHARGER_SOLD_AS_ID"
    CHARGER="CHARGER"
    SECRET_KEY = "X_API_SECRET_KEY"
    SENDGRID_API_KEY = "SENDGRID_API_KEY"
    BASE_URL = "BASE_URL"


def environ(key: Enum):
    return os.environ.get(key.value)


class Methods(Enum):
    GET = "GET"
    POST = "POST"
    DELETE = "DELETE"
    PUT = "PUT"


class Environment(Enum):
    DEVELOPMENT = "DEV"
    STAGING = "STAGE"
    PRODUCTION = "PROD"


# Ops-console db collections
class Database(Enum):
    VEHICLE_MANUFACTURERS = "vehicle-manufacturers"
    VEHICLES_META = "vehicles-meta"
    VIN_VID = "vinVidMappings"
    TOKENS="tokens"
    ERROR_CODES = "errorcodes"
    ERRORCODEGROUPS ="errorCodeGroups"
    CHARGERS_META = "chargers-meta"
    CHARGERS_MANUFACTURER="manufacturers"
    UTILITYPROVIDER = "utilityprovider"
    UTILITYPLAN = "utilityplan"
    UTILITYRATE = "utilityrate"
    ZIPCODES = "zipcodes"
    BILLING_UNITS = "billingUnits"
    CONTACT_INFO = "contact-info"
    DATACATALOGUE_HISTORY = "dataCatalogueHistory"


class Module(Enum):
    UTILITY_RATES = "utility-rates"
    DATA_DICTIONARY = "data-dictionary"
    CHARGERS_META = "chargers-meta"
    VEHICLE_MANUFACTURER = "vehicle-manufacturers"
    VEHICLES_META = "vehicles-meta"
    ERROR_CODES = "error-codes"
    VIN_VID = "vin-vid"
    HEALTH = "health"
    GENABILITY = "genability"
    BILLING_UNITS = "billing-units"
    CONTACT_INFO = "contact-info"
    CHARGER_LOCATOR = "charger-locator"

class Crons(Enum):
    FETCH_RATE_PLANS = "fetch-rate-plans"
    AUTOMATED_BILLING = "automated-billing-cron"
    GLOBAL_ANALYTICS = "global-analytics-cron"
    TERMITES = "termites-cron"
    DEPOTS_EXPIRY = "depots-expiry-cron"
    CHARGER_OFFLINE_ALERT = "charger-offline-alert"
    CHARGER_UPTIME = "charger-uptime-cron"
    CHARGERS_METRICS = "charger-count-cron"
    CHARGING_METRICS_CRON = "charging-metrics-cron"


class CommonConstant(Enum):
    AUTHORIZATION = "Authorization"
    CONTENT_TYPE = "Content-Type"
    APPLICATION_JSON = "application/json"

# -------------------------------------------------------------
    '''
    Migrated ops console enums
    '''
# -------------------------------------------------------------
class DataCatalogue(Enum):
    VEHICLEMETA = "Vehicles"
    CHARGERS = "Chargers"
    ERROR_CODES = "ErrorCodes"
    VEHICLES = "VIN-VID Mapping"
    UTILITY_PROVIDERS = "UtilityProviders"

class FaultSeverity(Enum):
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"
    UNKNOWN = "Unknown"
    DIAGNOSTIC = "Diagnostic"