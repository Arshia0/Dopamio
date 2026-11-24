from . import jalali
import pytz
from django.utils import timezone

def persian_number(num):
	number = {
		"0": "۰",
		"1": "۱",
		"2": "۲",
		"3": "۳",
		"4": "۴",
		"5": "۵",
		"6": "۶",
		"7": "۷",
		"8": "۸",
		"9": "۹",
	}

	for english , persian in number.items():
		num = num.replace(english, persian)

	return num

def convert_to_timezone(datetime_field, target_timezone):
    if datetime_field:
        current_timezone = timezone.get_current_timezone()
        target_timezone = timezone.pytz.timezone(target_timezone)

        converted_datetime = datetime_field.astimezone(target_timezone)

        return converted_datetime
    else:
        return None

def get_list(time):
	time_to_str = "{},{},{}".format(time.year, time.month, time.day)
	time_to_tuple = jalali.Gregorian(time_to_str).persian_tuple()
	time_to_list = list(time_to_tuple)
	return time_to_list

def Jalali_calender(time):

	time_to_list = get_list(time)

	get_month_jalali(time_to_list)

	time = timezone.localtime(time, pytz.timezone('Asia/Tehran'))

	output = "روز {} {} {}, ساعت {}:{}".format(
			time_to_list[2],
			time_to_list[1],
			time_to_list[0],
			time.hour,
			time.minute,
		)

	return persian_number(output)

def get_month_jalali(time_to_list):
	jalali_month = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]

	for index, month in enumerate(jalali_month):
		if time_to_list[1] == index+1:
			time_to_list[1] = month
			break

	return time_to_list[1]
