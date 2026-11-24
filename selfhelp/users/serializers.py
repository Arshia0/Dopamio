from datetime import datetime
from dj_rest_auth.serializers import LoginSerializer, TokenSerializer
from rest_framework import serializers
from .models import *
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from phonenumber_field.serializerfields import PhoneNumberField
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from .authentication import PhoneAuthBackend
from django.utils.timezone import make_naive
from datetime import datetime
from .cache_function import getAllKey

# Get the UserModel
UserModel = get_user_model()


class CustomLoginSerializer(LoginSerializer):
    phone_number = PhoneNumberField(required=True)
    email = None
    username = None

    def validate(self, attrs):
        phone_number = attrs.get('phone_number', '')
        password = attrs.get('password', '')

        user = PhoneAuthBackend().authenticate(request=self.context.get('request'),
                                               phone_number=phone_number,
                                               password=password)

        if not user:
            raise serializers.ValidationError('Invalid phone number or password')

        if not user.is_active:
            raise serializers.ValidationError('User account is disabled.')

        backend_path = 'users.authentication.PhoneAuthBackend'
        user.backend = backend_path

        attrs['user'] = user
        return attrs

class CustomRegisterSerializer(RegisterSerializer):
    username = None
    phone_number = PhoneNumberField(required=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password], style={'input_type': 'password', 'placeholder': 'Password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password', 'placeholder': 'Password'})
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    age = serializers.IntegerField(required=False, allow_null=True)
    gender = serializers.ChoiceField(choices=Account.GENDER_CHOICES, required=False, allow_blank=True)

    def validate_phone_number(self, value):
        if Account.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("Phone number is already in use.")
        return value

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['phone_number'] = self.validated_data.get('phone_number', '')
        data_dict['email'] = self.validated_data.get('email', '')
        data_dict['age'] = self.validated_data.get('age', None)
        data_dict['gender'] = self.validated_data.get('gender', '')
        return data_dict

    def save(self, request):
        user = super().save(request)
        user.first_name = self.cleaned_data.get('first_name')
        user.last_name = self.cleaned_data.get('last_name')
        user.phone_number = self.cleaned_data.get('phone_number')
        user.email = self.cleaned_data.get('email')
        user.age = self.cleaned_data.get('age')
        user.gender = self.cleaned_data.get('gender')
        print(self.validated_data)  # بررسی داده‌های معتبر شده
        print(self.errors)  # بررسی خطاهای احتمالی
        user.save()
        return user

class SendSMSResetPasswordSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True)

    code = serializers.CharField(max_length= 10, allow_blank=True, allow_null=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')

        user = Account.objects.filter(phone_number=phone_number).first()

        if not user:
            raise serializers.ValidationError('This phone number dosnt register in system')

        attrs['user'] = user
        return attrs

class ResetPassSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, validators=[validate_password],style={'input_type': 'password', 'placeholder': 'Password'})
    new_password_confirm = serializers.CharField(required=True, validators=[validate_password],style={'input_type': 'password', 'placeholder': 'Password'})
    phone_number = serializers.CharField(allow_blank=True)
    code = serializers.CharField(max_length= 10, allow_blank=True)

    def validate(self, attrs):
        phone_number = attrs.get('phone_number')

        user = Account.objects.filter(phone_number=phone_number).first()

        if not user:
            raise serializers.ValidationError('This phone number dosnt register in system')

        attrs['user'] = user
        return attrs

class ChagePasswordSerializer(serializers.Serializer):
    model = Account
    new_password = serializers.CharField(required=True, validators=[validate_password], style={'input_type': 'password', 'placeholder': 'Password'})
    old_password = serializers.CharField(required=True, validators=[validate_password], style={'input_type': 'password', 'placeholder': 'Password'})

class MainPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['phone_number', 'first_name', 'last_name', 'age', 'gender', 'total_score']

class UserScoreSerializer(serializers.ModelSerializer):
    days_in_program = serializers.SerializerMethodField()

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'total_score', 'date_joined', 'days_in_program']

    def get_days_in_program(self, obj):
        now = datetime.now()
        if obj.date_joined:
            naive_date_joined = make_naive(obj.date_joined)
            delta = now - naive_date_joined
            return delta.days
        return 0

class BellSerializer(serializers.ModelSerializer):
    category_ = serializers.SerializerMethodField()

    class Meta:
        model = Bell
        fields = ['id', 'name', 'category', 'score', 'text', 'category_']

    def get_category_(self, obj):
        return dict(obj.CATEGORY_CHOICES).get(obj.category, obj.category)

class AccBellSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccBell
        fields = '__all__'

class BookPodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookPodcast
        fields = ['id', 'title', 'image', 'author', 'about', 'category', 'publication_year']

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'image', 'director', 'actors', 'summary', 'category', 'publication_year']

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id', 'title', 'image', 'author', 'music_file', 'category', 'publication_year']

class MedicineSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta:
        model = Medicine
        fields = ['id', 'name', 'description', 'tags', 'prescription_required', 'image']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
