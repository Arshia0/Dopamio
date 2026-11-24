from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from selfhelp.extensions.utils import Jalali_calender
from django.core.files.base import ContentFile
from mutagen.mp3 import MP3
from mutagen.id3 import ID3
from django.db import models
from datetime import time
from PIL import Image
import os
import io



class Account(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=False,
        blank=True,
        null=True
    )
    phone_number = PhoneNumberField(
        unique=True,
        null=False,
        blank=False,
    )
    age = models.PositiveIntegerField(
        null=True,
        blank=True
    )
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    gender = models.CharField(
        max_length=1,
        choices=GENDER_CHOICES,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    deleted_at = models.DateTimeField(
        default=None,
        null=True,
        blank=True
    )
    total_score = models.PositiveIntegerField(default=0)

    USERNAME_FIEL = 'phone_number'
    REQUIRED_FIELDS = ['phone_number']

    class Meta:
        verbose_name = 'Accounts'
        verbose_name_plural = 'Accounts'

    def created_date(self):
        return Jalali_calender(self.created_at)

    def updated_date(self):
        if self.updated_at:
            return Jalali_calender(self.updated_at)

    def deleted_date(self):
        if self.deleted_at:
            return Jalali_calender(self.deleted_at)

    def joined_date(self):
        return Jalali_calender(self.date_joined)


    def __str__(self):
        return str(self.phone_number)

class Bell(models.Model):
    CATEGORY_CHOICES = [
        ('calm', 'آرامش'),
        ('health', 'سلامت'),
        ('happiness', 'خوشحالی'),
        ('personal_development', 'توسعه فردی'),
        ('reflection', 'تفکر'),
    ]

    DAYS_OF_WEEK = [
        ('شنبه', 'Saturday'),
        ('یکشنبه', 'Sunday'),
        ('دوشنبه', 'Monday'),
        ('سه‌شنبه', 'Tuesday'),
        ('چهارشنبه', 'Wednesday'),
        ('پنجشنبه', 'Thursday'),
        ('جمعه', 'Friday'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    score = models.IntegerField()
    text = models.JSONField(default=dict)

    def __str__(self):
        return self.name

class AccBell(models.Model):
    DONE = 'done'
    OVERDUE = 'overdue'
    PENDING = 'pending'

    STATUS_CHOICES = [
        (DONE, 'انجام شده'),
        (OVERDUE, 'مهلت گذشته'),
        (PENDING, 'در انتظار'),
    ]

    MORNING_TIME = time(8, 0)  # 08:00 AM
    AFTERNOON_TIME = time(16, 0)  # 04:00 PM
    EVENING_TIME = time(21, 0)  # 09:00 PM

    TIME_CHOICES = [
        ('morning', 'صبح'),
        ('afternoon', 'ظهر'),
        ('evening', 'شب'),
    ]

    acc = models.ForeignKey(Account, on_delete=models.CASCADE)
    bell = models.ForeignKey(Bell, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.CharField(max_length=10, choices=TIME_CHOICES)
    clock = models.TimeField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)
    reminder = models.BooleanField(default=False)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING,
    )
    file = models.FileField(upload_to='task_files/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.clock:
            if self.time == 'morning':
                self.clock = self.MORNING_TIME
            elif self.time == 'afternoon':
                self.clock = self.AFTERNOON_TIME
            elif self.time == 'evening':
                self.clock = self.EVENING_TIME
        elif not self.time:
            if self.clock.hour < 12:
                self.time = 'morning'
            elif 12 <= self.clock.hour < 18:
                self.time = 'afternoon'
            else:
                self.time = 'evening'

        super(AccBell, self).save(*args, **kwargs)

    def date_d(self):
        return Jalali_calender(self.date)

    def __str__(self):
        return f"{self.bell.name} - {self.date} {self.time} ({self.clock})"

class BookPodcast(models.Model):
    CATEGORY_CHOICES = [
        ('book', 'کتاب'),
        ('podcast', 'پادکست'),
    ]
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='books_podcasts/', blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    about = models.TextField(blank=True, null=True)  # فیلد درباره کتاب
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    publication_year = models.PositiveIntegerField(blank=True, null=True)  # سال انتشار

    def __str__(self):
        return self.title

class Movie(models.Model):
    CATEGORY_CHOICES = [
        ('action', 'اکشن'),
        ('comedy', 'کمدی'),
        ('drama', 'درام'),
        ('adventure', 'ماجراجویی'),
    ]
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='movies/', blank=True, null=True)
    director = models.CharField(max_length=255, blank=True, null=True)
    actors = models.TextField(blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    publication_year = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return self.title

class Music(models.Model):
    CATEGORY_CHOICES = [
        ('pop', 'پاپ'),
        ('rock', 'راک'),
        ('traditional', 'سنتی'),
        ('jazz', 'جاز'),
    ]

    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='music/', blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    music_file = models.FileField(upload_to='music_files/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    publication_year = models.PositiveIntegerField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.music_file and not self.music_file._committed:
            try:
                super(Music, self).save(*args, **kwargs)

                file_path = self.music_file.path

                if not os.path.exists(file_path):
                    return

                audio = MP3(file_path, ID3=ID3)

                if not self.title and 'TIT2' in audio:
                    self.title = audio['TIT2'].text[0]

                if not self.author and 'TPE1' in audio:
                    self.author = audio['TPE1'].text[0]

                if not self.image:
                    artwork = None
                for key in audio.tags.keys():
                    if key.startswith('APIC:'):
                        artwork = audio.tags[key].data
                        break

                if not artwork and 'covr' in audio.tags:
                    artwork = audio.tags['covr'].data

                if artwork:
                    img = Image.open(io.BytesIO(artwork))
                    img_io = io.BytesIO()
                    img.save(img_io, format='JPEG')
                    self.image.save(f"{self.title}_cover.jpg", ContentFile(img_io.getvalue()), save=False)

                if not self.title or not self.author:
                    filename = os.path.splitext(os.path.basename(self.music_file.name))[0]
                    parts = filename.split('-')
                    if len(parts) == 2:
                        self.title = parts[0].strip() if not self.title else self.title
                        self.author = parts[1].strip() if not self.author else self.author

                super(Music, self).save(update_fields=['title', 'author', 'image'])

            except Exception:
                print("Error extracting metadata")
        else:
            super(Music, self).save(*args, **kwargs)

    def __str__(self):
        return self.title if self.title else "Unknown Title"

class Medicine(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    tags = models.ManyToManyField('Tag', related_name='medicines')
    prescription_required = models.BooleanField(default=False)
    image = models.ImageField(upload_to='medicine_images/', blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.image:
            self.image = 'default_image.png'
        super(Medicine, self).save(*args, **kwargs)

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
