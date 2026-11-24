from .models import Account

class PhoneAuthBackend:
    """
    Custom authentication backend.

    Allows users to log in using their email address.
    """

    def authenticate(self, request, phone_number=None, password=None):
        """
        Overrides the authenticate method to allow users to log in using their email address.
        """
        try:
            user = Account.objects.get(phone_number=phone_number)
            if user.check_password(password):
                return user
            return None
        except Account.DoesNotExist:
            return None

    def get_user(self, user_id):
        """
        Overrides the get_user method to allow users to log in using their email address.
        """
        try:
            return Account.objects.get(pk=user_id)
        except Account.DoesNotExist:
            return None
