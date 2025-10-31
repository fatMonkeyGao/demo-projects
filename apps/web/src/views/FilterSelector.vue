<template>
  <div class="filter-selector bg-white p-6 rounded-lg shadow-sm">
    <!-- 年级筛选 -->
    <div class="filter-section mb-6">
      <label class="filter-label">年级：</label>
      <div class="filter-options">
        <button
          v-for="grade in grades"
          :key="grade.value"
          :class="[
            'filter-button',
            grade.value === selectedGrade
              ? 'filter-button-active'
              : 'filter-button-default',
          ]"
          @click="selectGrade(grade.value)"
        >
          {{ grade.label }}
        </button>
      </div>
    </div>

    <!-- 考试筛选 -->
    <div class="filter-section mb-6">
      <label class="filter-label">考试：</label>
      <div class="filter-options flex flex-wrap gap-2 mb-2">
        <button
          v-for="exam in selectedExams"
          :key="exam.id"
          class="exam-tag"
          @click="removeExam(exam.id)"
        >
          {{ exam.name }}
          <svg
            class="w-4 h-4 ml-2 text-gray-400"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M8.72945 0.150949L4.79195 4.08845L0.854449 0.150949C0.750115 0.0572819 0.632949 0.0104488 0.502949 0.0104488C0.372949 0.0104488 0.258282 0.0599487 0.158949 0.158949C0.0596154 0.257949 0.0101152 0.372615 0.0104485 0.502949C0.0107819 0.633282 0.0576153 0.750449 0.150949 0.854449L4.08845 4.79195L0.150949 8.72945C0.0156153 8.86478 -0.0287179 9.02628 0.0179487 9.21395C0.0646154 9.40162 0.179282 9.51878 0.361949 9.56545C0.544615 9.61212 0.708615 9.56778 0.853948 9.43245L4.79145 5.49495L8.72895 9.43245C8.83328 9.52612 8.95045 9.57295 9.08045 9.57295C9.21045 9.57295 9.32511 9.52345 9.42445 9.42445C9.52378 9.32545 9.57328 9.21078 9.57295 9.08045C9.57261 8.95012 9.52578 8.83295 9.43245 8.72895L5.49495 4.79145L9.43245 0.853949C9.56778 0.718615 9.61211 0.557116 9.56545 0.369449C9.51878 0.181782 9.40161 0.0646154 9.21395 0.0179487C9.02628 -0.0287179 8.86478 0.0156153 8.72945 0.150949Z"
            />
          </svg>
        </button>
      </div>

      <div class="exam-actions">
        <button class="exam-action-button" @click="showExamFilter">
          <svg class="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
            <path
              d="M12 -0.5L0 -0.5Q-0.0894493 -0.5 -0.173351 -0.468988Q-0.257252 -0.437976 -0.325197 -0.379798Q-0.362604 -0.347769 -0.393044 -0.309058Q-0.423483 -0.270346 -0.445786 -0.22644Q-0.468088 -0.182534 -0.481396 -0.135121Q-0.494704 -0.0877074 -0.498507 -0.0386088Q-0.50231 0.0104899 -0.496461 0.059387Q-0.490611 0.108284 -0.475335 0.155101Q-0.460059 0.201917 -0.435943 0.244854Q-0.411827 0.28779 -0.379798 0.325197L4.3 5.79074L4.3 9.81481Q4.3 9.88477 4.3192 9.95204Q4.3384 10.0193 4.37533 10.0787Q4.41225 10.1382 4.46407 10.1852Q4.51588 10.2322 4.57861 10.2631L6.97861 11.4483Q7.08327 11.5 7.2 11.5Q7.24925 11.5 7.29754 11.4904Q7.34584 11.4808 7.39134 11.4619Q7.43684 11.4431 7.47778 11.4157Q7.51873 11.3884 7.55355 11.3536Q7.58838 11.3187 7.61573 11.2778Q7.64309 11.2368 7.66194 11.1913Q7.68079 11.1458 7.69039 11.0975Q7.7 11.0492 7.7 11L7.7 5.79074L12.3798 0.325197Q12.438 0.257252 12.469 0.173351Q12.5 0.0894493 12.5 0Q12.5 -0.0492457 12.4904 -0.0975451Q12.4808 -0.145845 12.4619 -0.191342Q12.4431 -0.236839 12.4157 -0.277785Q12.3884 -0.318731 12.3536 -0.353553Q12.3187 -0.388375 12.2778 -0.415735Q12.2368 -0.443094 12.1913 -0.46194Q12.1458 -0.480785 12.0975 -0.490393Q12.0492 -0.5 12 -0.5ZM1.08636 0.5L5.1798 5.28073Q5.23798 5.34867 5.26899 5.43258Q5.3 5.51648 5.3 5.60593L5.3 9.50408L6.7 10.1954L6.7 5.60593Q6.7 5.51648 6.73101 5.43258Q6.76202 5.34867 6.8202 5.28073L10.9136 0.5L1.08636 0.5Z"
            />
          </svg>
          筛选考试
        </button>
        <button class="exam-clear-button" @click="clearExams">清空</button>
      </div>
    </div>

    <!-- 学科筛选 -->
    <div class="filter-section mb-6">
      <label class="filter-label">学科：</label>
      <div class="filter-options">
        <button
          v-for="subject in subjects"
          :key="subject.value"
          :class="[
            'filter-button',
            subject.value === selectedSubject
              ? 'filter-button-active'
              : 'filter-button-default',
          ]"
          @click="selectSubject(subject.value)"
        >
          {{ subject.label }}
        </button>
      </div>

      <!-- 收起按钮 -->
      <button class="collapse-button" @click="toggleCollapse">
        {{ isCollapsed ? "展开" : "收起" }}
        <svg
          :class="[
            'w-4 h-4 ml-2 transform transition-transform',
            isCollapsed ? '' : '-rotate-90',
          ]"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            d="M0.438257 11.375C0.30678 11.375 0.219128 11.3313 0.131477 11.2437C-0.0438257 11.0688 -0.0438257 10.8062 0.131477 10.6313L5.08378 5.6875L0.131477 0.74375C-0.0438257 0.56875 -0.0438257 0.30625 0.131477 0.13125C0.30678 -0.04375 0.569734 -0.04375 0.745037 0.13125L6.00412 5.38125C6.09177 5.46875 6.1356 5.55625 6.1356 5.6875C6.1356 5.81875 6.09177 5.90625 6.00412 5.99375L0.745037 11.2437C0.657385 11.3313 0.569734 11.375 0.438257 11.375L0.438257 11.375Z"
          />
        </svg>
      </button>
    </div>

    <!-- 班级筛选 -->
    <div v-if="!isCollapsed" class="filter-section mb-6">
      <label class="filter-label">班级：</label>
      <div class="class-filter-container">
        <div class="class-options">
          <button
            v-for="classItem in classes"
            :key="classItem.value"
            :class="[
              'class-button',
              classItem.value === selectedClass
                ? 'class-button-active'
                : 'class-button-default',
            ]"
            @click="selectClass(classItem.value)"
          >
            {{ classItem.label }}
          </button>
        </div>

        <button class="more-button" @click="showMoreClasses">
          更多
          <svg
            class="w-3 h-3 ml-1 transform rotate-90"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M0.438257 11.375C0.30678 11.375 0.219128 11.3313 0.131477 11.2437C-0.0438257 11.0688 -0.0438257 10.8062 0.131477 10.6313L5.08378 5.6875L0.131477 0.74375C-0.0438257 0.56875 -0.0438257 0.30625 0.131477 0.13125C0.30678 -0.04375 0.569734 -0.04375 0.745037 0.13125L6.00412 5.38125C6.09177 5.46875 6.1356 5.55625 6.1356 5.6875C6.1356 5.81875 6.09177 5.90625 6.00412 5.99375L0.745037 11.2437C0.657385 11.3313 0.569734 11.375 0.438257 11.375L0.438257 11.375Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button class="settings-button" @click="openSettings">
        <svg class="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M8.7665 0L12.2355 2L11.5635 3.172C11.7928 3.443 12.0012 3.73983 12.1885 4.0625C12.3758 4.38517 12.5322 4.7185 12.6575 5.0625L14.0015 5.0625L14.0015 9.0625L12.6575 9.0625C12.4075 9.7605 12.0428 10.3907 11.5635 10.953L12.2355 12.125L8.7665 14.125L8.0945 12.953C7.36517 13.0883 6.636 13.0883 5.907 12.953L5.235 14.125L1.766 12.125L2.438 10.953C2.19833 10.6717 1.98733 10.3722 1.805 10.0545C1.62267 9.73683 1.469 9.40617 1.344 9.0625L0 9.0625L0 5.0625L1.344 5.0625C1.594 4.3645 1.95867 3.73433 2.438 3.172L1.766 2L5.235 0L5.907 1.172C6.63633 1.03667 7.3655 1.03667 8.0945 1.172L8.7665 0ZM8.954 1.67188L9.1415 1.35938L10.8605 2.35888L10.345 3.28087L10.798 3.81238C10.996 4.05204 11.1732 4.3047 11.3295 4.57037C11.4858 4.83605 11.6108 5.10954 11.7045 5.39087L11.9545 6.06287L13.0015 6.06287L13.0015 8.06287L11.939 8.06287L11.7045 8.73487C11.4962 9.30754 11.194 9.83354 10.798 10.3129L10.345 10.8444L10.8605 11.7664L9.1415 12.7664L8.61 11.8444L7.907 11.9694C7.303 12.0841 6.69883 12.0841 6.0945 11.9694L5.3915 11.8444L4.86 12.7664L3.141 11.7664L3.6565 10.8444L3.2035 10.3129C2.99483 10.0629 2.81767 9.81287 2.672 9.56287Q2.4535 9.18787 2.297 8.73487L2.047 8.06287L1 8.06287L1 6.06287L2.0625 6.06287L2.297 5.39087C2.50533 4.80754 2.8075 4.28154 3.2035 3.81288L3.6565 3.28137L3.141 2.35938L4.86 1.35938L5.3915 2.28137L6.0945 2.15637C6.6985 2.04171 7.30267 2.04171 7.907 2.15637L8.61 2.28137L8.954 1.67188ZM9.4775 4.586C8.81617 3.92467 7.99067 3.5835 7.001 3.5625C6.01133 3.5835 5.18583 3.92467 4.5245 4.586C3.86317 5.24733 3.522 6.07283 3.501 7.0625C3.522 8.05217 3.86317 8.87767 4.5245 9.539C5.18583 10.2003 6.01133 10.5415 7.001 10.5625C7.99067 10.5415 8.81617 10.2003 9.4775 9.539C10.1388 8.87767 10.48 8.05217 10.501 7.0625C10.48 6.07283 10.1388 5.24733 9.4775 4.586ZM5.2355 5.297C5.70417 4.82833 6.29267 4.5835 7.001 4.5625C7.70933 4.5835 8.29783 4.82833 8.7665 5.297C9.2352 5.76567 9.48 6.35417 9.501 7.0625C9.48 7.77083 9.2352 8.35933 8.7665 8.828C8.29783 9.29667 7.70933 9.5415 7.001 9.5625C6.29267 9.5415 5.70417 9.29667 5.2355 8.828C4.76683 8.35933 4.522 7.77083 4.501 7.0625C4.522 6.35417 4.76683 5.76567 5.2355 5.297Z"
          />
        </svg>
        设置临界生
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 主题色变量 - --color-primary: #05C1AE
const PRIMARY_COLOR = "#05C1AE";

// 响应式数据
const selectedGrade = ref("grade1");
const selectedSubject = ref("overall");
const selectedClass = ref("all");
const isCollapsed = ref(false);
const selectedExams = ref([
  { id: 1, name: "高三期末第一次模拟..." },
  { id: 2, name: "高三期末第一次模拟..." },
  { id: 3, name: "高三期末第一次模拟..." },
  { id: 4, name: "高三期末第一次模拟..." },
]);

// 年级选项
const grades = [
  { value: "grade1", label: "高一年级" },
  { value: "grade2", label: "高二年级" },
  { value: "grade3", label: "高三年级" },
];

// 学科选项
const subjects = [
  { value: "overall", label: "总体学情" },
  { value: "chinese", label: "语文" },
  { value: "math", label: "数学" },
  { value: "english", label: "英语" },
  { value: "physics", label: "物理" },
  { value: "chemistry", label: "化学" },
  { value: "biology", label: "生物" },
  { value: "history", label: "历史" },
  { value: "geography", label: "地理" },
  { value: "politics", label: "政治" },
];

// 班级选项
const classes = [
  { value: "all", label: "全部" },
  { value: "class1", label: "高一年级1班" },
  { value: "class2", label: "高一年级2班" },
  { value: "class3", label: "高一年级3班" },
  { value: "class4", label: "高一年级4班" },
  { value: "class5", label: "高一年级5班" },
  { value: "class6", label: "高一年级6班" },
  { value: "class7", label: "高一年级7班" },
  { value: "class8", label: "高一年级8班" },
];

// 方法
const selectGrade = (grade: string) => {
  selectedGrade.value = grade;
};

const selectSubject = (subject: string) => {
  selectedSubject.value = subject;
};

const selectClass = (classValue: string) => {
  selectedClass.value = classValue;
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const removeExam = (examId: number) => {
  selectedExams.value = selectedExams.value.filter(
    (exam) => exam.id !== examId
  );
};

const showExamFilter = () => {
  // 显示考试筛选弹窗的逻辑
  console.log("显示考试筛选");
};

const clearExams = () => {
  selectedExams.value = [];
};

const showMoreClasses = () => {
  // 显示更多班级的逻辑
  console.log("显示更多班级");
};

const openSettings = () => {
  // 打开设置临界生弹窗的逻辑
  console.log("打开设置临界生");
};
</script>

<style scoped>
.filter-selector {
  max-width: 1200px;
  margin: 0 auto;
}

.filter-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.filter-label {
  font-family: "SourceHanSansCN", "Source Han Sans", sans-serif;
  font-size: 14px;
  color: #595959;
  white-space: nowrap;
  line-height: 32px;
  min-width: 42px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.filter-button {
  height: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: "Source Han Sans", sans-serif;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-button-default {
  background-color: transparent;
  color: #262626;
  border-color: transparent;
}

.filter-button-default:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.filter-button-active {
  background-color: rgba(
    5,
    193,
    174,
    0.1
  ); /* 主题色/--color-primary: rgba(5, 193, 174, 0.1) */
  color: #05c1ae; /* 主题色/--color-primary: #05C1AE */
  border-color: #05c1ae;
  border-style: dashed;
}

.exam-tag {
  height: 32px;
  padding: 6px 8px;
  border-radius: 4px;
  background-color: rgba(5, 193, 174, 0.1);
  color: #05c1ae;
  border: 1px dashed #05c1ae;
  font-family: "SourceHanSansCN", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  max-width: 178px;
}

.exam-tag:hover {
  background-color: rgba(5, 193, 174, 0.15);
}

.exam-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.exam-action-button {
  display: flex;
  align-items: center;
  color: #05c1ae;
  font-family: "Source Han Sans", sans-serif;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.exam-action-button:hover {
  opacity: 0.8;
}

.exam-clear-button {
  color: #05c1ae;
  font-family: "Source Han Sans", sans-serif;
  font-size: 14px;
  line-height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center;
}

.exam-clear-button:hover {
  opacity: 0.8;
}

.collapse-button {
  height: 32px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: rgba(5, 193, 174, 0.1);
  color: #05c1ae;
  border: none;
  font-family: "Source Han Sans", sans-serif;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: auto;
  transition: all 0.2s ease;
}

.collapse-button:hover {
  background-color: rgba(5, 193, 174, 0.15);
}

.class-filter-container {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.class-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  flex: 1;
}

.class-button {
  height: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: "SourceHanSansCN", sans-serif;
  font-size: 14px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 102px;
}

.class-button-default {
  background-color: rgba(0, 0, 0, 0.2);
  color: #262626;
  opacity: 0.2;
}

.class-button-default:hover {
  opacity: 0.4;
}

.class-button-active {
  background-color: rgba(5, 193, 174, 0.1);
  color: #05c1ae;
  border-color: #05c1ae;
  border-style: dashed;
  opacity: 1;
}

.more-button {
  display: flex;
  align-items: center;
  color: #05c1ae;
  font-family: "Source Han Sans", sans-serif;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
}

.more-button:hover {
  opacity: 0.8;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.settings-button {
  height: 32px;
  padding: 5px 16px 5px 16px;
  border-radius: 4px;
  background-color: transparent;
  color: #05c1ae; /* 主题色/--color-primary: #05C1AE */
  border: 1px solid #05c1ae;
  font-family: "PingFang SC", sans-serif;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.settings-button:hover {
  background-color: rgba(5, 193, 174, 0.05);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-label {
    line-height: 20px;
    margin-bottom: 8px;
  }

  .class-filter-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .class-options {
    width: 100%;
  }

  .collapse-button {
    margin-left: 0;
    align-self: flex-end;
  }
}
</style>



