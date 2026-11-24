from rest_framework import permissions
from users.models import VerifiedAccounts

class IsAuthorizedWithSMS(permissions.BasePermission):
    message = "Your account has no been sms confirmed yet."

    def has_permission(self, request, view):
        if request.user.sms_auth_at:
            return True
        return False

class IsAuthorizedByAdmin(permissions.BasePermission):
    message = "You have already sent a request that is in Pending or Approved status."

    def has_permission(self, request, view):
        user = request.user
        # is there any user with  this statuses ['APPROVED', 'PENDING', 'BANNED'] ?
        all_auth = VerifiedAccounts.objects.filter(
            account=user,
            status__in=['APPROVED', 'PENDING', 'BANNED']
        )
        if all_auth:
            return False
        return True
