import random
import string

from django.conf import settings
from django.core.exceptions import ImproperlyConfigured
from kavenegar import APIException, HTTPException, KavenegarAPI

from .cache_function import addKey


def generate_unique_code(size=6, chars=string.digits):
    return "".join(random.choice(chars) for _ in range(size))


def send_sms_code(phone_number):
    code = generate_unique_code()
    message = f"کد تأیید دوپامیو: {code}"
    addKey(key=phone_number, value=code, timeout=settings.SMS_TIMEOUT * 60)

    if not settings.KAVE_NEGAR_ENABLE:
        if settings.DEBUG:
            print(f"Development verification code: {code}")
        return

    if not settings.KAVE_NEGAR_APIKEY or not settings.KAVE_NEGAR_SENDER:
        raise ImproperlyConfigured(
            "Set KAVE_NEGAR_APIKEY and KAVE_NEGAR_SENDER to enable SMS delivery."
        )

    try:
        api = KavenegarAPI(settings.KAVE_NEGAR_APIKEY)
        api.sms_send(
            {
                "sender": settings.KAVE_NEGAR_SENDER,
                "receptor": str(phone_number),
                "message": message,
            }
        )
    except (APIException, HTTPException) as exc:
        # Avoid logging phone numbers, message text, or provider credentials.
        print(f"SMS provider request failed: {type(exc).__name__}")
