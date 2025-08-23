<template>
  <div class="w-full bg-white rounded-lg p-5">
    <!-- 年级筛选 -->
    <div class="flex items-center gap-4 mb-6">
      <span class="text-gray-600 text-sm">年级：</span>
      <div
        class="px-3 py-2 rounded border border-dashed border-primary bg-primary/10 text-primary text-sm"
      >
        高一年级
      </div>
      <div
        v-for="grade in otherGrades"
        :key="grade.id"
        class="px-3 py-2 rounded border border-gray-200 text-gray-700 text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors"
        @click="selectGrade(grade.id)"
      >
        {{ grade.name }}
      </div>
    </div>

    <!-- 考试筛选 -->
    <div class="flex items-center gap-4 mb-6">
      <span class="text-gray-600 text-sm">考试：</span>
      <div
        v-for="exam in selectedExams"
        :key="exam.id"
        class="flex items-center gap-2 px-2 py-2 rounded border border-dashed border-primary bg-primary/10 text-primary text-sm"
      >
        <span class="truncate max-w-32">{{ exam.name }}</span>
        <button
          @click="removeExam(exam.id)"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8.72945 0.150949L4.79195 4.08845L0.854449 0.150949C0.750115 0.0572819 0.632949 0.0104488 0.502949 0.0104488C0.372949 0.0104488 0.258282 0.0599487 0.158949 0.158949C0.0596154 0.257949 0.0101152 0.372615 0.0104485 0.502949C0.0107819 0.633282 0.0576153 0.750449 0.150949 0.854449L4.08845 4.79195L0.150949 8.72945C0.0156153 8.86478 -0.0287179 9.02628 0.0179487 9.21395C0.0646154 9.40162 0.179282 9.51878 0.361949 9.56545C0.544615 9.61212 0.708615 9.56778 0.853948 9.43245L4.79145 5.49495L8.72895 9.43245C8.83328 9.52612 8.95045 9.57295 9.08045 9.57295C9.21045 9.57295 9.32511 9.52345 9.42445 9.42445C9.52378 9.32545 9.57328 9.21078 9.57295 9.08045C9.57261 8.95012 9.52578 8.83295 9.43245 8.72895L5.49495 4.79145L9.43245 0.853949C9.56778 0.718615 9.61211 0.557116 9.56545 0.369449C9.51878 0.181782 9.40161 0.0646154 9.21395 0.0179487C9.02628 -0.0287179 8.86478 0.0156153 8.72945 0.150949Z"
            />
          </svg>
        </button>
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <button
          @click="showExamFilter"
          class="flex items-center gap-2 text-primary text-sm hover:text-primary/80 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M12 -0.5L0 -0.5Q-0.0894493 -0.5 -0.173351 -0.468988Q-0.257252 -0.437976 -0.325197 -0.379798Q-0.362604 -0.347769 -0.393044 -0.309058Q-0.423483 -0.270346 -0.445786 -0.22644Q-0.468088 -0.182534 -0.481396 -0.135121Q-0.494704 -0.0877074 -0.498507 -0.0386088Q-0.50231 0.0104899 -0.496461 0.059387Q-0.490611 0.108284 -0.475335 0.155101Q-0.460059 0.201917 -0.435943 0.244854Q-0.411827 0.28779 -0.379798 0.325197L4.3 5.79074L4.3 9.81481Q4.3 9.88477 4.3192 9.95204Q4.3384 10.0193 4.37533 10.0787Q4.41225 10.1382 4.46407 10.1852Q4.51588 10.2322 4.57861 10.2631L6.97861 11.4483Q7.08327 11.5 7.2 11.5Q7.24925 11.5 7.29754 11.4904Q7.34584 11.4808 7.39134 11.4619Q7.43684 11.4431 7.47778 11.4157Q7.51873 11.3884 7.55355 11.3536Q7.58838 11.3187 7.61573 11.2778Q7.64309 11.2368 7.66194 11.1913Q7.68079 11.1458 7.69039 11.0975Q7.7 11.0492 7.7 11L7.7 5.79074L12.3798 0.325197Q12.438 0.257252 12.469 0.173351Q12.5 0.0894493 12.5 0Q12.5 -0.0492457 12.4904 -0.0975451Q12.4808 -0.145845 12.4619 -0.191342Q12.4431 -0.236839 12.4157 -0.277785Q12.3884 -0.318731 12.3536 -0.353553Q12.3187 -0.388375 12.2778 -0.415735Q12.2368 -0.443094 12.1913 -0.46194Q12.1458 -0.480785 12.0975 -0.490393Q12.0492 -0.5 12 -0.5ZM1.08636 0.5L5.1798 5.28073Q5.23798 5.34867 5.26899 5.43258Q5.3 5.51648 5.3 5.60593L5.3 9.50408L6.7 10.1954L6.7 5.60593Q6.7 5.51648 6.73101 5.43258Q6.76202 5.34867 6.8202 5.28073L10.9136 0.5L1.08636 0.5Z"
            />
          </svg>
          筛选考试
        </button>
        <button
          @click="clearAllFilters"
          class="text-primary text-sm hover:text-primary/80 transition-colors"
        >
          清空
        </button>
      </div>
    </div>

    <!-- 班级筛选 -->
    <div class="flex items-center gap-4 mb-6">
      <span class="text-gray-600 text-sm">班级：</span>
      <div
        class="px-3 py-2 rounded border border-dashed border-primary bg-primary/10 text-primary text-sm"
      >
        全部
      </div>
      <div
        v-for="classItem in availableClasses.slice(0, 7)"
        :key="classItem.id"
        class="px-3 py-2 rounded border border-gray-200 text-gray-700 text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors bg-gray-100"
        @click="selectClass(classItem.id)"
      >
        {{ classItem.name }}
      </div>
      <button
        v-if="availableClasses.length > 7"
        @click="showMoreClasses"
        class="flex items-center gap-1 text-primary text-sm hover:text-primary/80 transition-colors"
      >
        <span>更多</span>
        <svg
          class="w-3 h-3 transform rotate-90"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            d="M0.438257 11.375C0.30678 11.375 0.219128 11.3313 0.131477 11.2437C-0.0438257 11.0688 -0.0438257 10.8062 0.131477 10.6313L5.08378 5.6875L0.131477 0.74375C-0.0438257 0.56875 -0.0438257 0.30625 0.131477 0.13125C0.30678 -0.04375 0.569734 -0.04375 0.745037 0.13125L6.00412 5.38125C6.09177 5.46875 6.1356 5.55625 6.1356 5.6875C6.1356 5.81875 6.09177 5.90625 6.00412 5.99375L0.745037 11.2437C0.657385 11.3313 0.569734 11.375 0.438257 11.375L0.438257 11.375Z"
          />
        </svg>
      </button>
    </div>

    <!-- 学科筛选 -->
    <div class="flex items-center gap-4 mb-6">
      <span class="text-gray-600 text-sm">学科：</span>
      <div
        class="px-3 py-2 rounded border border-dashed border-primary bg-primary/10 text-primary text-sm"
      >
        总体学情
      </div>
      <div
        v-for="subject in subjects"
        :key="subject.id"
        class="px-3 py-2 rounded border border-gray-200 text-gray-700 text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors"
        @click="selectSubject(subject.id)"
      >
        {{ subject.name }}
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="flex items-center justify-between">
      <div></div>
      <div class="flex items-center gap-4">
        <button
          @click="setCriticalStudents"
          class="flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded hover:bg-primary hover:text-white transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M8.7665 0L12.2355 2L11.5635 3.172C11.7928 3.443 12.0012 3.73983 12.1885 4.0625C12.3758 4.38517 12.5322 4.7185 12.6575 5.0625L14.0015 5.0625L14.0015 9.0625L12.6575 9.0625C12.4075 9.7605 12.0428 10.3907 11.5635 10.953L12.2355 12.125L8.7665 14.125L8.0945 12.953C7.36517 13.0883 6.636 13.0883 5.907 12.953L5.235 14.125L1.766 12.125L2.438 10.953C2.19833 10.6717 1.98733 10.3722 1.805 10.0545C1.62267 9.73683 1.469 9.40617 1.344 9.0625L0 9.0625L0 5.0625L1.344 5.0625C1.594 4.3645 1.95867 3.73433 2.438 3.172L1.766 2L5.235 0L5.907 1.172C6.63633 1.03667 7.3655 1.03667 8.0945 1.172L8.7665 0ZM8.954 1.67188L9.1415 1.35938L10.8605 2.35888L10.345 3.28087L10.798 3.81238C10.996 4.05204 11.1732 4.3047 11.3295 4.57037C11.4858 4.83605 11.6108 5.10954 11.7045 5.39087L11.9545 6.06287L13.0015 6.06287L13.0015 8.06287L11.939 8.06287L11.7045 8.73487C11.4962 9.30754 11.194 9.83354 10.798 10.3129L10.345 10.8444L10.8605 11.7664L9.1415 12.7664L8.61 11.8444L7.907 11.9694C7.303 12.0841 6.69883 12.0841 6.0945 11.9694L5.3915 11.8444L4.86 12.7664L3.141 11.7664L3.6565 10.8444L3.2035 10.3129C2.99483 10.0629 2.81767 9.81287 2.672 9.56287Q2.4535 9.18787 2.297 8.73487L2.047 8.06287L1 8.06287L1 6.06287L2.0625 6.06287L2.297 5.39087C2.50533 4.80754 2.8075 4.28154 3.2035 3.81288L3.6565 3.28137L3.141 2.35938L4.86 1.35938L5.3915 2.28137L6.0945 2.15637C6.6985 2.04171 7.30267 2.04171 7.907 2.15637L8.61 2.28137L8.954 1.67188ZM9.4775 4.586C8.81617 3.92467 7.99067 3.5835 7.001 3.5625C6.01133 3.5835 5.18583 3.92467 4.5245 4.586C3.86317 5.24733 3.522 6.07283 3.501 7.0625C3.522 8.05217 3.86317 8.87767 4.5245 9.539C5.18583 10.2003 6.01133 10.5415 7.001 10.5625C7.99067 10.5415 8.81617 10.2003 9.4775 9.539C10.1388 8.87767 10.48 8.05217 10.501 7.0625C10.48 6.07283 10.1388 5.24733 9.4775 4.586ZM5.2355 5.297C5.70417 4.82833 6.29267 4.5835 7.001 4.5625C7.70933 4.5835 8.29783 4.82833 8.7665 5.297C9.2352 5.76567 9.48 6.35417 9.501 7.0625C9.48 7.77083 9.2352 8.35933 8.7665 8.828C8.29783 9.29667 7.70933 9.5415 7.001 9.5625C6.29267 9.5415 5.70417 9.29667 5.2355 8.828C4.76683 8.35933 4.522 7.77083 4.501 7.0625C4.522 6.35417 4.76683 5.76567 5.2355 5.297Z"
            />
          </svg>
          设置临界生
        </button>

        <div
          class="flex items-center gap-2 px-3 py-2 rounded bg-primary/10 text-primary"
        >
          <span class="text-sm">收起</span>
          <svg
            class="w-4 h-4 transform rotate-180"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M0.438257 11.375C0.30678 11.375 0.219128 11.3313 0.131477 11.2437C-0.0438257 11.0688 -0.0438257 10.8062 0.131477 10.6313L5.08378 5.6875L0.131477 0.74375C-0.0438257 0.56875 -0.0438257 0.30625 0.131477 0.13125C0.30678 -0.04375 0.569734 -0.04375 0.745037 0.13125L6.00412 5.38125C6.09177 5.46875 6.1356 5.55625 6.1356 5.6875C6.1356 5.81875 6.09177 5.90625 6.00412 5.99375L0.745037 11.2437C0.657385 11.3313 0.569734 11.375 0.438257 11.375L0.438257 11.375Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// 类型定义
interface Grade {
  id: string;
  name: string;
}

interface ClassItem {
  id: string;
  name: string;
  gradeId: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Exam {
  id: string;
  name: string;
}

// 响应式数据
const selectedGradeId = ref<string>("grade_1");
const selectedClassIds = ref<string[]>([]);
const selectedSubjectId = ref<string>("overall");
const selectedExams = ref<Exam[]>([
  { id: "exam_1", name: "高三期末第一次模拟..." },
  { id: "exam_2", name: "高三期末第一次模拟..." },
  { id: "exam_3", name: "高三期末第一次模拟..." },
]);

// 静态数据
const grades: Grade[] = [
  { id: "grade_1", name: "高一年级" },
  { id: "grade_2", name: "高二年级" },
  { id: "grade_3", name: "高三年级" },
];

const subjects: Subject[] = [
  { id: "chinese", name: "语文" },
  { id: "math", name: "数学" },
  { id: "english", name: "英语" },
  { id: "physics", name: "物理" },
  { id: "chemistry", name: "化学" },
  { id: "biology", name: "生物" },
  { id: "history", name: "历史" },
  { id: "geography", name: "地理" },
  { id: "politics", name: "政治" },
];

const allClasses: ClassItem[] = [
  { id: "class_1_1", name: "高一年级1班", gradeId: "grade_1" },
  { id: "class_1_2", name: "高一年级2班", gradeId: "grade_1" },
  { id: "class_1_3", name: "高一年级3班", gradeId: "grade_1" },
  { id: "class_1_4", name: "高一年级4班", gradeId: "grade_1" },
  { id: "class_1_5", name: "高一年级5班", gradeId: "grade_1" },
  { id: "class_1_6", name: "高一年级6班", gradeId: "grade_1" },
  { id: "class_1_7", name: "高一年级7班", gradeId: "grade_1" },
  { id: "class_1_8", name: "高一年级8班", gradeId: "grade_1" },
  { id: "class_2_1", name: "高二年级1班", gradeId: "grade_2" },
  { id: "class_2_2", name: "高二年级2班", gradeId: "grade_2" },
  { id: "class_3_1", name: "高三年级1班", gradeId: "grade_3" },
  { id: "class_3_2", name: "高三年级2班", gradeId: "grade_3" },
];

// 计算属性
const otherGrades = computed(() =>
  grades.filter((grade) => grade.id !== selectedGradeId.value)
);

const availableClasses = computed(() =>
  allClasses.filter((classItem) => classItem.gradeId === selectedGradeId.value)
);

// 方法
const selectGrade = (gradeId: string) => {
  selectedGradeId.value = gradeId;
  selectedClassIds.value = []; // 切换年级时清空班级选择
};

const selectClass = (classId: string) => {
  if (selectedClassIds.value.includes(classId)) {
    selectedClassIds.value = selectedClassIds.value.filter(
      (id) => id !== classId
    );
  } else {
    selectedClassIds.value.push(classId);
  }
};

const selectSubject = (subjectId: string) => {
  selectedSubjectId.value = subjectId;
};

const removeExam = (examId: string) => {
  selectedExams.value = selectedExams.value.filter(
    (exam) => exam.id !== examId
  );
};

const showExamFilter = () => {
  // TODO: 实现考试筛选弹窗
  console.log("显示考试筛选");
};

const showMoreClasses = () => {
  // TODO: 实现更多班级展示
  console.log("显示更多班级");
};

const clearAllFilters = () => {
  selectedClassIds.value = [];
  selectedSubjectId.value = "overall";
  selectedExams.value = [];
};

const setCriticalStudents = () => {
  // TODO: 实现设置临界生功能
  console.log("设置临界生");
};
</script>

<style scoped>
/* 主题色变量 - 根据设计规范定义 */
:root {
  --color-primary: #05c1ae; /* 来自设计稿的主题色 */
}

/* 自定义 Tailwind 样式 */
.text-primary {
  color: var(--color-primary);
}

.border-primary {
  border-color: var(--color-primary);
}

.bg-primary {
  background-color: var(--color-primary);
}

.bg-primary\/10 {
  background-color: rgba(5, 193, 174, 0.1);
}

.hover\:bg-primary:hover {
  background-color: var(--color-primary);
}

.hover\:border-primary:hover {
  border-color: var(--color-primary);
}

.hover\:text-primary:hover {
  color: var(--color-primary);
}

.hover\:text-primary\/80:hover {
  color: rgba(5, 193, 174, 0.8);
}
</style>
