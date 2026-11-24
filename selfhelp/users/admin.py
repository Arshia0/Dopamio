from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin


class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (("Personal info"), {"fields": ("first_name", "last_name", "total_score")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
        (("others data"), {"fields":("phone_number","deleted_at")})
    )
    list_display = ("email", "phone_number", "first_name", "last_name", "total_score", "joined_date", "is_staff")
    ordering = ("-is_staff", "-date_joined")

class BellAdmin(admin.ModelAdmin):
    list_display = ('name', 'score', 'category')
    search_fields = ('name', 'text')

class AccBellAdmin(admin.ModelAdmin):
    list_display = ('acc', 'bell', 'time', 'date', 'status')
    list_filter = ('status', 'date', 'time')
    search_fields = ('acc__phone_number', 'bell__name')
    date_hierarchy = 'date'

@admin.register(BookPodcast)
class BookPodcastAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'publication_year')
    search_fields = ('title', 'author')
    list_filter = ('category', 'publication_year')

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'director', 'publication_year')
    search_fields = ('title', 'director', 'actors')
    list_filter = ('category', 'publication_year')

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'publication_year')
    search_fields = ('title', 'author')
    list_filter = ('category', 'publication_year')

class MedicineAdmin(admin.ModelAdmin):
    list_display = ['name', 'prescription_required', 'get_tags']
    search_fields = ['name', 'description']
    list_filter = ['prescription_required', 'tags']
    autocomplete_fields = ['tags']

    def get_tags(self, obj):
        return ", ".join([tag.name for tag in obj.tags.all()])
    get_tags.short_description = "تگ‌ها"

class TagAdmin(admin.ModelAdmin):
    list_display = ['name']
    search_fields = ['name']


admin.site.register(Medicine, MedicineAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Account, UserAdmin)
admin.site.register(Bell, BellAdmin)
admin.site.register(AccBell, AccBellAdmin)
