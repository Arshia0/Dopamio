from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from django.contrib.auth import update_session_auth_hash
from rest_framework_simplejwt.tokens import RefreshToken
from dj_rest_auth.registration.views import RegisterView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView
from dj_rest_auth.views import LoginView
from .send_sms import send_sms_code
from .cache_function import getValue
from .models import Account
from .serializers import *


class CustomRegisterView(RegisterView):
    queryset = Account.objects.all()
    permission_classes = ( )
    serializer_class = CustomRegisterSerializer

class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

    def get_response(self):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=self.request.data,
                                      context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return Response(data, status=status.HTTP_200_OK)

class MainPageView(generics.GenericAPIView):
    serializer_class = MainPageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            serializer = self.get_serializer(user)
            return Response({
                'message': 'Welcome to the main page!',
                'user': serializer.data
            })
        else:
            return Response({
                'message': 'Welcome to the main page!',
                'user': None
            })

class UserScoreListView(generics.ListAPIView):
    queryset = Account.objects.order_by('-total_score')
    serializer_class = UserScoreSerializer
    authentication_classes = []
    permission_classes = []

class SendSMSResetPasswordView(generics.GenericAPIView):
    serializer_class = SendSMSResetPasswordSerializer
    permission_classes = [AllowAny]

    def put(self, request):
        serializer = self.get_serializer(data = request.data)

        if serializer.is_valid(raise_exception= True):
            code = serializer.data.get("code")
            phone_number = serializer.data.get("phone_number")
            if code:
                if getValue(phone_number) == code:
                    return Response(data= {"data" : "verification successfully done"}, status= status.HTTP_200_OK)
                return Response(data= {"data" : "entered code is incorrect"}, status= status.HTTP_400_BAD_REQUEST)
            elif not code and phone_number not in getAllKey('*'):
                send_sms_code(phone_number)
                return Response(data= {"data" : "sms is sent for you"}, status= status.HTTP_200_OK)
            return Response(data= {"data" : "code is already sent for you"}, status= status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(generics.UpdateAPIView):
    serializer_class = ResetPassSerializer
    permission_classes = [AllowAny]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception= True)

        code = serializer.data.get("code")
        phone_number = serializer.data.get("phone_number")

        user = Account.objects.filter(phone_number=phone_number).first()

        if getValue(phone_number) != code:
            return Response(data= {"data" : "entered code is incorrect"}, status= status.HTTP_400_BAD_REQUEST)

        if serializer.data.get("new_password") != serializer.data.get("new_password_confirm"):
            return Response(
                        data= {"message" : "Password confirmation does not match the password"},
                        status= status.HTTP_400_BAD_REQUEST
                    )

        user.set_password(serializer.data.get("new_password"))


        user.save()
        update_session_auth_hash(request, user)
        return Response(
                    data= {"message" : "password update successfully"},
                    status= status.HTTP_200_OK
                )

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class= ChagePasswordSerializer
    permission_classes= (IsAuthenticated, )
    model= Account

    def get_object(self, queryset= None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object= self.get_object()
        serializer= self.get_serializer(data= request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get('old_password')):
                return Response(
                            data= {"message" : "the old password is wrong."},
                            status= status.HTTP_400_BAD_REQUEST
                        )

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()


            return Response(
                        data= {"message" : "password update successfully"},
                        status= status.HTTP_200_OK
                    )

        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

class BellListView(APIView):
    permission_classes= (IsAuthenticatedOrReadOnly, )
    def get(self, request):
        bells = Bell.objects.all()
        serializer = BellSerializer(bells, many=True)
        return Response(serializer.data)

class BellDetailView(APIView):
    permission_classes= (IsAuthenticatedOrReadOnly, )
    def get(self, request, pk, format=None):
        try:
            bell = Bell.objects.get(pk=pk)
            serializer = BellSerializer(bell)
            return Response(serializer.data)
        except Bell.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class WeeklyScheduleView(generics.ListAPIView):
    serializer_class = AccBellSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if not start_date or not end_date:
            return AccBell.objects.none()

        try:
            start_date = datetime.strptime(start_date, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
        except ValueError:
            return AccBell.objects.none()

        return AccBell.objects.filter(acc=user, date__range=[start_date, end_date])

class ScheduleTaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None):
        try:
            task = AccBell.objects.get(pk=pk)
            serializer = AccBellSerializer(task)
            return Response(serializer.data)
        except AccBell.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk=None):
        user = request.user
        data = request.data.copy()
        data['acc'] = user.id

        if 'clock' in request.data:
            data['clock'] = request.data['clock']

        serializer = AccBellSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        try:
            task = AccBell.objects.get(pk=pk)
        except AccBell.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()

        if 'clock' in request.data:
            data['clock'] = request.data['clock']

        serializer = AccBellSerializer(task, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        try:
            task = AccBell.objects.get(pk=pk)
        except AccBell.DoesNotExist:
            return Response({'error': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        task.delete()
        return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class BookPodcastListView(generics.ListAPIView):
    queryset = BookPodcast.objects.all()
    serializer_class = BookPodcastSerializer

class MovieListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MusicListView(generics.ListAPIView):
    queryset = Music.objects.all()
    serializer_class = MusicSerializer

class MedicineListView(generics.ListAPIView):
    queryset = Medicine.objects.all()
    serializer_class = MedicineSerializer

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
