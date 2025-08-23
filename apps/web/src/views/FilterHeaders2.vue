<template>
  <div class="w-full h-[464px] bg-white relative">
    <!-- 背景容器 -->
    <div
      class="absolute w-[1200px] h-[208px] left-[194px] top-[100px] bg-white rounded-b-[12px]"
    ></div>

    <!-- 主要内容区域 -->
    <div class="absolute w-[1200px] h-[208px] left-[214px] top-[116px]">
      <!-- 收起按钮区域 -->
      <div class="absolute w-16 h-8 left-[1116px] top-[160px]">
        <div
          class="w-16 h-8 bg-[rgba(5,193,174,0.1)] rounded-tl-[12px] border border-dashed border-[#05C1AE] relative"
        >
          <div class="absolute w-12 h-4 left-2 top-2 flex items-center gap-1">
            <span class="text-sm text-[#05C1AE] font-normal leading-[14px]"
              >收起</span
            >
            <el-icon
              class="w-4 h-4 text-[#05C1AE] transform -rotate-90"
              @click="props.onToggleCollapse"
            >
              <ArrowRight />
            </el-icon>
          </div>
        </div>
      </div>

      <!-- 学科筛选区域 -->
      <div
        class="absolute w-[738px] h-8 left-0 top-[144px] flex items-center gap-4"
      >
        <span class="text-sm text-[#595959] font-normal leading-5">学科：</span>

        <!-- 总体学情 (选中状态) -->
        <div
          class="w-20 h-8 bg-[rgba(5,193,174,0.1)] border border-dashed border-[#05C1AE] rounded relative"
        >
          <span
            class="absolute w-14 h-5 left-3 top-1.5 text-sm text-[#05C1AE] font-normal text-center leading-[-1px]"
          >
            {{ props.selectedSubject || "总体学情" }}
          </span>
        </div>

        <!-- 学科选项按钮组 -->
        <div class="flex gap-4">
          <el-button
            v-for="subject in props.subjects"
            :key="subject.id"
            class="w-[52px] h-8 text-sm text-[#262626] font-normal"
            :class="{ 'bg-[#05C1AE] text-white': subject.selected }"
            @click="props.onSubjectChange?.(subject.id)"
          >
            {{ subject.name }}
          </el-button>
        </div>
      </div>

      <!-- 年级和设置临界生区域 -->
      <div
        class="absolute w-[1172px] h-8 left-0 top-0 flex justify-between items-center"
      >
        <!-- 年级筛选 -->
        <div class="flex items-center gap-4">
          <span class="text-sm text-[#595959] font-normal leading-5"
            >年级：</span
          >

          <!-- 高一年级 (选中状态) -->
          <div
            class="w-20 h-8 bg-[rgba(5,193,174,0.1)] border border-dashed border-[#05C1AE] rounded relative"
          >
            <span
              class="absolute w-14 h-5 left-3 top-1.5 text-sm text-[#05C1AE] font-normal leading-5"
            >
              {{ props.selectedGrade || "高一年级" }}
            </span>
          </div>

          <!-- 其他年级选项 -->
          <div class="flex gap-4">
            <el-button
              v-for="grade in props.grades"
              :key="grade.id"
              class="w-20 h-8 text-sm text-[#262626] font-normal"
              :class="{ 'bg-[#05C1AE] text-white': grade.selected }"
              @click="props.onGradeChange?.(grade.id)"
            >
              {{ grade.name }}
            </el-button>
          </div>
        </div>

        <!-- 设置临界生按钮 -->
        <el-button
          type="primary"
          class="w-[126px] h-8 bg-[#05C1AE] border-[#05C1AE]"
          @click="props.onSettingClick"
        >
          <el-icon class="w-4 h-4 mr-2">
            <Setting />
          </el-icon>
          设置临界生
        </el-button>
      </div>

      <!-- 班级筛选区域 -->
      <div
        class="absolute w-[1106px] h-8 left-0 top-24 flex justify-between items-center"
      >
        <!-- 班级选项 -->
        <div class="flex items-center gap-4">
          <span class="text-sm text-[#595959] font-normal leading-5"
            >班级：</span
          >

          <!-- 全部 (选中状态) -->
          <div
            class="w-[98px] h-8 bg-[rgba(5,193,174,0.1)] border border-dashed border-[#05C1AE] rounded relative"
          >
            <span
              class="absolute w-7 h-5 left-[29px] top-1.5 text-sm text-[#05C1AE] font-normal text-center leading-[-1px]"
            >
              {{ props.selectedClass || "全部" }}
            </span>
          </div>

          <!-- 班级选项按钮组 -->
          <div class="flex gap-4">
            <el-button
              v-for="classItem in props.classes"
              :key="classItem.id"
              class="w-[102px] h-8 text-sm text-[#262626] font-normal opacity-20"
              :class="{
                'bg-[#05C1AE] text-white opacity-100': classItem.selected,
              }"
              @click="props.onClassChange?.(classItem.id)"
            >
              {{ classItem.name }}
            </el-button>
          </div>
        </div>

        <!-- 更多按钮 -->
        <div class="flex items-center gap-1">
          <span
            class="text-sm text-[#05C1AE] font-normal leading-[14px]"
            @click="props.onMoreClick"
            >更多</span
          >
          <el-icon class="w-[6px] h-[11px] text-[#05C1AE] transform rotate-90">
            <ArrowRight />
          </el-icon>
        </div>
      </div>

      <!-- 考试筛选区域 -->
      <div class="absolute w-[942px] h-8 left-0 top-12 flex items-center gap-4">
        <span class="text-sm text-[#595959] font-normal leading-5">考试：</span>

        <!-- 已选择的考试项目 -->
        <div class="flex gap-4">
          <div
            v-for="exam in props.selectedExams"
            :key="exam.id"
            class="w-[178px] h-8 bg-[rgba(5,193,174,0.1)] border border-dashed border-[#05C1AE] rounded relative flex items-center"
          >
            <span
              class="absolute w-[138px] h-5 left-2 top-1.5 text-sm text-[#05C1AE] font-normal leading-5 truncate"
            >
              {{ exam.name }}
            </span>
            <el-icon
              class="absolute w-4 h-4 right-2 top-2 text-[#8C8C8C] cursor-pointer"
              @click="props.onExamRemove?.(exam.id)"
            >
              <Close />
            </el-icon>
          </div>
        </div>

        <!-- 筛选考试和清空按钮 -->
        <div class="flex items-center gap-4 ml-auto">
          <div
            class="flex items-center gap-1 cursor-pointer"
            @click="props.onExamFilter"
          >
            <el-icon class="w-4 h-4 text-[#05C1AE]">
              <Filter />
            </el-icon>
            <span
              class="text-sm text-[#05C1AE] font-normal text-center leading-[-1px]"
              >筛选考试</span
            >
          </div>
          <span
            class="text-sm text-[#05C1AE] font-normal text-center leading-8 cursor-pointer"
            @click="props.onClearAll"
          >
            清空
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Close, Filter, Setting } from "@element-plus/icons-vue";

// 数据类型定义
interface SubjectItem {
  id: string;
  name: string;
  selected?: boolean;
}

interface GradeItem {
  id: string;
  name: string;
  selected?: boolean;
}

interface ClassItem {
  id: string;
  name: string;
  selected?: boolean;
}

interface ExamItem {
  id: string;
  name: string;
}

// Props 接口定义
interface Props {
  // 数据类 props
  subjects: SubjectItem[];
  grades: GradeItem[];
  classes: ClassItem[];
  selectedExams: ExamItem[];
  selectedSubject?: string;
  selectedGrade?: string;
  selectedClass?: string;

  // 交互类 props - 回调函数
  onToggleCollapse?: () => void;
  onSubjectChange?: (subjectId: string) => void;
  onGradeChange?: (gradeId: string) => void;
  onClassChange?: (classId: string) => void;
  onSettingClick?: () => void;
  onMoreClick?: () => void;
  onExamRemove?: (examId: string) => void;
  onExamFilter?: () => void;
  onClearAll?: () => void;
}

// 定义 props，使用默认值
const props = withDefaults(defineProps<Props>(), {
  subjects: () => [
    { id: "chinese", name: "语文" },
    { id: "math", name: "数学" },
    { id: "english", name: "英语" },
    { id: "physics", name: "物理" },
    { id: "chemistry", name: "化学" },
    { id: "biology", name: "生物" },
    { id: "history", name: "历史" },
    { id: "geography", name: "地理" },
    { id: "politics", name: "政治" },
  ],
  grades: () => [
    { id: "grade2", name: "高二年级" },
    { id: "grade3", name: "高三年级" },
  ],
  classes: () => [
    { id: "class1", name: "高一年级1班" },
    { id: "class2", name: "高一年级2班" },
    { id: "class3", name: "高一年级3班" },
    { id: "class4", name: "高一年级4班" },
    { id: "class5", name: "高一年级5班" },
    { id: "class6", name: "高一年级6班" },
    { id: "class7", name: "高一年级7班" },
    { id: "class8", name: "高一年级8班" },
  ],
  selectedExams: () => [
    { id: "exam1", name: "高三期末第一次模拟..." },
    { id: "exam2", name: "高三期末第一次模拟..." },
    { id: "exam3", name: "高三期末第一次模拟..." },
  ],
  selectedSubject: "总体学情",
  selectedGrade: "高一年级",
  selectedClass: "全部",
});
</script>

<style>
/* 主题色变量 - 根据 DSL token 定义 */
:root {
  --color-primary: #05c1ae; /* 主题色/--color-primary */
}
</style>
