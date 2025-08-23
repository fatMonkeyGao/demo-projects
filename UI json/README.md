# UI DSL 数据文件

这个目录包含从 MasterGo 设计文件中提取的 DSL（Domain Specific Language）数据。

## 文件说明

### mastergo-design-dsl——1.json (原始文件)
- **文件ID**: 167719111140796
- **图层ID**: 2:0
- **设计URL**: https://mastergo.iflytek.com/file/167719111140796?page_id=M&devMode=true
- **提取时间**: 2024-12-19
- **描述**: 过滤器组件的完整设计数据，包含样式、节点结构和组件信息

### raw-mastergo-dsl-167719111140796.json (最新提取)
- **文件ID**: 167719111140796
- **图层ID**: 2:0
- **设计URL**: https://mastergo.iflytek.com/file/167719111140796?page_id=M&devMode=true&layer_id=2%3A0
- **提取时间**: 2024-12-19
- **描述**: 教育系统筛选面板UI组件的完整原始数据，包含详细的组件分析和特性说明

### complete-filter-panel-dsl.json (结构化版本)
- **描述**: 筛选面板组件的结构化DSL数据，包含完整的样式定义和节点层级
- **特点**: 更清晰的数据组织，便于代码生成和理解

### filter-panel-dsl.json (简化版本)
- **描述**: 筛选面板组件的基础DSL数据，包含核心样式和结构信息
- **特点**: 轻量级版本，适合快速原型开发

## DSL 数据结构

### 样式定义 (styles)
包含所有设计token和样式变量：
- `paint_*`: 颜色样式，包含主题色 `#05C1AE`
- `font_*`: 字体样式，包含字体族、大小、行高等
- `effect_*`: 效果样式，如阴影、模糊等

### 节点结构 (nodes)
设计组件的层级结构：
- **FRAME**: 容器组件
- **GROUP**: 组合组件
- **TEXT**: 文本组件
- **PATH**: 矢量路径
- **LAYER**: 图层
- **INSTANCE**: 组件实例

### 关键设计信息
- **主题色**: `#05C1AE` (cyan-teal) - 变量名: `主题色/--color-primary`
- **字体系列**: Source Han Sans, SourceHanSansCN, PingFang SC
- **主要功能**: 
  - 年级筛选 (高一/高二/高三年级)
  - 班级筛选 (全部/具体班级1-8班)
  - 学科筛选 (总体学情/语文/数学/英语/物理/化学/生物/历史/地理/政治)
  - 考试筛选 (多个考试选项，支持移除)
- **交互元素**: 
  - 筛选标签 (可选择/取消)
  - 清空按钮
  - 筛选考试功能
  - 设置临界生按钮
  - 收起/展开功能
  - 更多选项

## 使用说明

1. 这些 DSL 数据可以用于自动生成前端组件代码
2. 样式变量可以直接转换为 CSS/Tailwind 变量
3. 节点结构对应组件的 DOM 层级关系
4. 所有尺寸、颜色、字体信息都包含在内，确保设计还原度

## 相关文件

- `apps/web/src/views/FilterHeaders.vue` - 基于此 DSL 数据生成的 Vue 组件