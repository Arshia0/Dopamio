# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Sum
from .models import AccBell, Account

@receiver(post_save, sender=AccBell)
def update_total_score(sender, instance, **kwargs):
    if instance.status == 'done':
        total_score = AccBell.objects.filter(acc=instance.acc, status='done').aggregate(total=Sum('bell__score'))['total']
        if total_score is None:
            total_score = 0
        Account.objects.filter(id=instance.acc.id).update(total_score=total_score)
