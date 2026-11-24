from django.urls import path, include, re_path
from .views import *
from dj_rest_auth.views import LogoutView
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login_user'),
    path('logout/', LogoutView.as_view(), name= 'logout_user'),
    path('register/', CustomRegisterView.as_view(), name= "account_register"),
    path('competition_table/', UserScoreListView.as_view(), name='competition_table'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sms-reset/', SendSMSResetPasswordView.as_view(), name='sms-reset'),
    path('change-password/', ChangePasswordView.as_view(), name= "change_password"),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('bells/', BellListView.as_view(), name='bells'),
    path('bell/<int:pk>/', BellDetailView.as_view(), name='bell-detail'),
    path('schedule-task/', ScheduleTaskView.as_view(), name='schedule-task'),
    path('schedule-task/<int:pk>/', ScheduleTaskView.as_view(), name='schedule-task-update'),
    path('weekly-schedule/', WeeklyScheduleView.as_view(), name='weekly-schedule'),
    path('books-podcasts/', BookPodcastListView.as_view(), name='books-podcasts'),
    path('movies/', MovieListView.as_view(), name='movies'),
    path('music/', MusicListView.as_view(), name='music'),
    path('medicines/', MedicineListView.as_view(), name='medicine-list'),
    path('tags/', TagListView.as_view(), name='tag-list'),
]
