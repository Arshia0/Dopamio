from users.models import Bell

Bell.objects.create(name='استراحت', category='calm', score=5, text={})
Bell.objects.create(name='ماساژ', category='calm', score=7, text={})
Bell.objects.create(name='خواب', category='calm', score=10, text={})
Bell.objects.create(name='تنفس و رهایی', category='calm', score=6, text={})

Bell.objects.create(name='غذا', category='health', score=10, text={})
Bell.objects.create(name='ورزش', category='health', score=8, text={})
Bell.objects.create(name='دارو', category='health', score=9, text={})

Bell.objects.create(name='موسیقی', category='happiness', score=7, text={})
Bell.objects.create(name='اجتماعی', category='happiness', score=6, text={})
Bell.objects.create(name='سپاس‌گزاری', category='happiness', score=5, text={})

Bell.objects.create(name='هدف', category='personal_development', score=8, text={})
Bell.objects.create(name='کمک', category='personal_development', score=7, text={})
Bell.objects.create(name='جدید', category='personal_development', score=5, text={})

Bell.objects.create(name='منفی', category='reflection', score=4, text={})
Bell.objects.create(name='مثبت', category='reflection', score=5, text={})
Bell.objects.create(name='تفکر', category='reflection', score=6, text={})
Bell.objects.create(name='محاسبه', category='reflection', score=5, text={})
Bell.objects.create(name='ارزیابی', category='reflection', score=5, text={})
