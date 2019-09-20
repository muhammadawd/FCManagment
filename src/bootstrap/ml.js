import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller);

export default new MLCreate({
  initial: 'en',
  // development  , production
  save: process.env.NODE_ENV === 'development',
  languages: [
    new MLanguage('en').create({
      ar: 'Arabic language',
      en: 'Arabic language',
      notification: 'Notification',
      settings: 'Settings',
      search: 'Search',
      add: 'Add',
      edit: 'Edit',
      dashboard: 'dashboard',
      lecturer: 'lecturer Management',
      loading: 'Loading ...',
      add_lecturer: 'Add Lecturer',
      edit_lecturer: 'Edit Lecturer',
      id: 'ID',
      name: 'Name',
      sec_section: 'secondary sections',
      add_sec_section: 'Add secondary section',
      edit_sec_section: 'Edit secondary section',
      excuses: 'Excuses sections',
      add_excuses: 'Add Excuses section',
      edit_excuses: 'Edit Excuses section',
      country_section: 'Country sections',
      country: 'Country',
      add_country: 'Add Country',
      edit_country: 'Edit Country',
      government: 'Government',
      add_government: 'Add Government',
      edit_government: 'Edit Government',
      programs: 'Program Management',
      program: 'Program Management',
      add_program: 'Add Program',
      show_program: 'Show Program',
      edit_program: 'Edit Program',
      hours_need_grade: 'Hours Needed To Graduate',
      min_number_grade: 'Min Number Per Term To Graduate',
      max_fail_percent: 'Max Fail Percent In Success State',
      students: 'Student Management',
      add_student: 'Add Student',
      edit_student: 'Edit Student',
      ssn: 'SSN',
      show: 'Show',
      program_grades: 'Program Grades',
      add_program_grades: 'Add Program Grades',
      edit_program_grades: 'Edit Program Grades',
      from_grade: 'From Grade',
      to_grade: 'To Grade',
      points: 'Points',
      program_levels: 'Program Levels',
      add_program_levels: 'Add Program Levels',
      edit_program_levels: 'Edit Program Levels',
      min_hour_level: 'Min Hours Per Level',
      program_requires: 'Program Requires',
      add_program_requires: 'Add Program Requires',
      edit_program_requires: 'Edit Program Requires',
      under_requires: 'Under Require',
      requires: 'Requires',
      count_hours: 'Hours',
      courses: 'Courses Management',
      add_course: 'Add Course',
      edit_course: 'Edit Course',
      terms: 'Terms Management',
      add_term: 'Add Term',
      edit_term: 'Edit Term',
      program_grade: 'Program Grades',
      code: 'Code',
      require_type: 'Required type',
      actual_hours_per_lecture: 'Actual  Hours Per Lecture',
      activity_hours_per_lecture: 'Activity  Hours Per Lecture',
      un_actual_hours_per_lecture: 'Un Actual Hours Per Lecture',
      un_activity_hours_per_lecture: 'in Activity  Hours Per Lecture',
      min_hours_required: 'Min Hours Required',
      year_working_percent: 'Year Working Percent',
      final_percent: 'Final Percent',
      year_working_success_percent: 'Year Working Success Percent',
      final_success_percent: 'Final Success Percent',
      final_degree: 'Final Degree',
      get_started: 'Get Start',
      login: 'Login',
      term_start: 'Term Start',
      term_end: 'Term End',
      term_start_register: 'Term Start Register',
      term_end_register: 'Term End Register',
      term_start_editing: 'Term Start Editing',
      term_end_editing: 'Term End Editing',
      term_start_ending: 'Term Start Get Registers',
      term_end_ending: 'Term End Get Registers',
      term_type: 'Term Type',
      hours: 'Hours',
      subjects: 'subjects',
      course_requirement: 'Course Requirement',
      logout: 'logout',
      term_subjects: 'Term subjects',
      term_subject_hours: 'Term subjects Hours',
      admins: 'Admins',
      is_admin: 'Is Admin',
      yes: 'Yes',
      no: 'No',
      gpa_from: 'GPA Start',
      gpa_to: 'GPA End',
      max_hours: 'Max Hours',
      min_hours: 'Min Hours',
      term: 'Term Name',
      paid: 'Paid',
      special_max_hours: 'Max Hours In Special Cases',
      special_min_hours: 'Min Hours In Special Cases',
      city: 'City',
      full_address: 'Full Address',
      type_to_search: 'Type To Search',
      no_data: 'No Data',
      student_name: 'Student Name',
      course_name: 'Course Name',
      notes: 'Notes',
      date: 'Date',
      status: 'Status',
      status_accepted: 'Accepted',
      status_rejected: 'Rejected',
      filter: 'filter',
      file: 'file',
      degrees: 'Degrees Section',
      edit_degrees: 'Edit Degree',
      upload_file: 'upload File',
      download_file: 'Download Template',
      semester_name: 'Semester Name',
      final: 'Final',
      working_task: 'Working Task',
      absence_percent: 'Absence Percent',
      student_status: 'Student Status',
      student_subject: 'Student Subject Management',
      add_student_subject: 'Add Student Subjects',
      edit_student_subject: 'Edit Student Subjects',
      hour_price: 'hour price',
      lecturer_name: 'lecturer name',
      note: 'Note',
      note_hint: 'All materials are calculated by the number of hours as the number of hours for each article 300 pounds ',
      get_back: 'get back',
      price: 'Price',
      sub_total: 'Sub Total',
      discount: 'Discount',
      total: 'Total',
      pay: 'Pay',
      invoice_payment: 'Payment Invoice',
      confirm_payment_student_subject: 'Confirm Payment',
      i_get: 'I Have Recieved',
      from_student: 'From Student',
      from_course: 'Course',
      amount: 'Amount',
      register: 'Register',
      register_new: 'Register New Account',
      have_account: 'Having Account',
      data: 'Date',
      image: 'Image',
      success: 'Success',
      error: 'Error',
      success_msg: 'Operation Completed Successfully',
      error_msg: 'Error !!',
    }),

    new MLanguage('ar').create({
      ar: 'اللغة الانجليزية',
      en: 'اللغة الانجليزية',
      notification: 'الاشعارات',
      settings: 'الاعدادات',
      search: 'البحث',
      add: 'اضافة',
      edit: 'تعديل',
      dashboard: 'لوحة التحكم',
      lecturer: 'ادارة المحاضرين',
      loading: 'جاري التحميل',
      add_lecturer: 'اضافة محاضر',
      edit_lecturer: 'تعديل محاضر',
      id: 'رقم مسلسل',
      name: 'الاسم',
      sec_section: 'اقسام الثانوية العامة',
      add_sec_section: 'اضافة قسم الثانوية العامة',
      edit_sec_section: 'تعديل قسم الثانوية العامة',
      excuses: 'ادارة الاعذار',
      add_excuses: 'اضافة عذر',
      edit_excuses: 'تعديل عذر',
      country_section: 'البلاد و المحافظات',
      country: 'الدولة',
      add_country: 'اضافة دولة',
      edit_country: 'تعديل دولة',
      government: 'المحافظة',
      add_government: 'اضافة محافظة',
      edit_government: 'تعديل محافظة',
      program: 'ادارة  البرامج',
      programs: 'ادارة  البرامج',
      add_program: 'اضافة برنامج',
      show_program: 'عرض برنامج',
      edit_program: 'تعديل برنامج',
      hours_need_grade: 'عدد الساعات المطلوبة للتخرج',
      min_number_grade: 'اقل عدد فى الترم للتخرج',
      max_fail_percent: 'اقصي نسبة لمادة الرسوب عند النجاح فيها',
      students: '  ادارة الطلاب',
      add_student: 'اضافة طالب',
      edit_student: 'تعديل طالب',
      ssn: '  رقم البطافة',
      show: 'عرض',
      program_grades: 'تقديرات البرامج',
      add_program_grades: 'اضافة تقديرات البرامج',
      edit_program_grades: 'تعديل تقديرات البرامج',
      from_grade: 'التقدير من',
      to_grade: 'التقدير الى',
      points: 'نقاط',
      program_requires: 'متطلبات البرامج',
      program_levels: 'مستويات البرامج',
      add_program_levels: 'اضافة مستوي البرامج',
      edit_program_levels: 'تعديل مستوي البرامج',
      min_hour_level: 'اقل عدد ساعات فى المستوي',
      add_program_requires: 'اضافة متطلب برنامج',
      edit_program_requires: 'تعديل متطلب برنامج',
      under_requires: '  تحت متطلب',
      requires: 'متطلبات',
      count_hours: 'عدد الساعات',
      courses: 'ادارة الكورسات',
      add_course: 'اضافة كورس',
      edit_course: 'تعديل كورس',
      code: 'الكود',
      require_type: 'نوع المتطلب',
      actual_hours_per_lecture: 'عدد ساعات المحاضرة الفعلية',
      un_actual_hours_per_lecture: 'عدد ساعات المحاضرة غير الفعلية',
      activity_hours_per_lecture: 'عدد ساعات تمارين المحاضرة الفعلية',
      un_activity_hours_per_lecture: 'عدد ساعات تمارين المحاضرة غير الفعلية',
      min_hours_required: 'اقل عدد من الساعات المطلوبة',
      year_working_percent: 'نسبة اعمال السنة',
      final_percent: 'نسبة التحريري',
      year_working_success_percent: 'نسبة النجاح من اعمال السنة',
      final_success_percent: 'نسبة النجاح من التحريري',
      final_degree: 'الدرجة النهائية',
      program_grade: 'التقديرات الخاصة بالبرنامج  ',
      terms: '  ادراة التيرمات',
      add_term: 'اضافة تيرم',
      edit_term: 'تعديل تيرم',
      get_started: 'ابدأ الان',
      login: 'تسجيل الدخول',
      term_start: 'بداية التيرم',
      term_end: 'نهاية التيرم',
      term_start_register: 'بداية التسجيل',
      term_end_register: 'نهاية التسجيل',
      term_start_editing: 'بداية التعديل',
      term_end_editing: 'نهاية التعديل',
      term_start_ending: 'بداية سحب التسجيل',
      term_end_ending: 'نهاية سحب التسجيل',
      term_type: 'نوع التيرم',
      hours: 'ساعات',
      subjects: 'المواد',
      course_requirement: 'متطلبات الكورس',
      logout: 'تسجيل الخروج',
      term_subjects: 'مواد التيرم',
      term_subject_hours: 'ساعات التيرم',
      admins: 'المسئولون',
      is_admin: 'هل هو مدير',
      yes: 'نعم',
      no: 'ﻻ',
      gpa_from: 'GPA من',
      gpa_to: 'GPA الى',
      max_hours: 'عدد الساعات القصوى',
      min_hours: 'عدد الساعات الادني',
      special_max_hours: 'عدد الساعات القصوي فى الحالات الخاصة',
      special_min_hours: 'عدد الساعات الادني فى الحالات الخاصة',
      city: 'المدينة',
      full_address: 'العنوان',
      type_to_search: 'اكتب للبحث',
      no_data: 'ﻻ توجد بيانات',
      student_name: 'اسم الطالب',
      course_name: 'اسم المادة',
      notes: 'تفاصيل',
      date: 'التاريخ',
      status: 'الحالة',
      status_accepted: 'مقبول',
      status_rejected: 'مرفوض',
      filter: 'تصفية',
      file: 'الملف',
      upload: 'رفع الملف',
      degrees: 'ادارة الدرجات',
      edit_degrees: 'تعديل درجة',
      upload_file: 'رفع ملف',
      download_file: 'تنزيل نموذج ملف',
      semester_name: 'اسم السيمستر',
      final: 'النهائي',
      working_task: 'العملي',
      absence_percent: 'نسبة الغياب',
      student_status: 'حالة الطالب',
      student_subject: 'ادارة مواد الطلاب',
      add_student_subject: 'تسجيل مواد الطلاب',
      edit_student_subject: 'تعديل مواد الطلاب',
      hour_price: 'سعر الساعة',
      lecturer_name: 'اسم المحاضر',
      term: 'اسم التيرم',
      get_back: 'انسحاب',
      paid: 'مدفوع',
      note: 'ملاحظة',
      note_hint: 'جميع المواد تحسب عن طريق عدد الساعات حيث ان عدد الساعات الخاصة بكل مادة ساعة 300 جنيه',
      price: 'السعر',
      sub_total: 'اجمالى المواد',
      total: 'الاجمالي النهائي',
      discount: 'الخصم',
      confirm_payment_student_subject: 'تأكيد الدفع',
      invoice_payment: 'ايصال الدفع',
      pay: 'دفع',
      i_get: 'استلمت انا',
      from_student: 'من الطالب',
      from_course: 'مادة',
      amount: 'مبلغ',
      register: 'تسجيل حساب',
      register_new: 'تسجيل حساب جديد',
      have_account: 'لدي حساب بالفعل',
      data: 'تاريخ',
      image: 'صورة',
      success: 'نجاح',
      error: 'خطأ',
      success_msg: 'تمت العملية بنجاح',
      error_msg: 'حدث خطأ',
    })
  ]
})
