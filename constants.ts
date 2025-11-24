import { Curriculum, GradeLevel, Semester } from './types';

export const APP_NAME = "MathGenius AI";

export const CURRICULUM_DATA: Curriculum = {
  [GradeLevel.ONE]: {
    [Semester.FIRST]: [
      { id: 'g1-s1-10addsub', name: '10以内加减法', description: '基础数字认知与简单计算' },
      { id: 'g1-s1-20add', name: '20以内进位加法', description: '凑十法练习' },
      { id: 'g1-s1-compare', name: '比大小 (<, >, =)', description: '数字大小比较' },
    ],
    [Semester.SECOND]: [
      { id: 'g1-s2-20sub', name: '20以内退位减法', description: '破十法练习' },
      { id: 'g1-s2-100addsub', name: '100以内整十数加减', description: '整十数的运算' },
      { id: 'g1-s2-rmb', name: '人民币的认识', description: '元角分简单换算' },
    ]
  },
  [GradeLevel.TWO]: {
    [Semester.FIRST]: [
      { id: 'g2-s1-100mix', name: '100以内加减混合', description: '连加连减' },
      { id: 'g2-s1-mul1-6', name: '乘法口诀 (1-6)', description: '基础乘法表' },
      { id: 'g2-s1-mul-all', name: '表内乘法 (1-9)', description: '完整九九乘法表' },
    ],
    [Semester.SECOND]: [
      { id: 'g2-s2-div', name: '表内除法', description: '用乘法口诀求商' },
      { id: 'g2-s2-mix', name: '混合运算', description: '加减乘除两步计算' },
      { id: 'g2-s2-rem', name: '有余数的除法', description: '简单的余数计算' },
    ]
  },
  [GradeLevel.THREE]: {
    [Semester.FIRST]: [
      { id: 'g3-s1-time', name: '时分秒计算', description: '时间的加减' },
      { id: 'g3-s1-big-add', name: '万以内加减法', description: '多位数竖式计算' },
      { id: 'g3-s1-multi-digit', name: '多位数乘一位数', description: '笔算乘法' },
    ],
    [Semester.SECOND]: [
      { id: 'g3-s2-div-digit', name: '除数是一位数的除法', description: '笔算除法' },
      { id: 'g3-s2-2digit-mul', name: '两位数乘两位数', description: '乘法进阶' },
      { id: 'g3-s2-frac', name: '分数的初步认识', description: '同分母分数加减' },
    ]
  },
  [GradeLevel.FOUR]: {
    [Semester.FIRST]: [
      { id: 'g4-s1-big-num', name: '大数的认识', description: '读数与写数' },
      { id: 'g4-s1-3digit-mul', name: '三位数乘两位数', description: '大数乘法' },
      { id: 'g4-s1-div-2digit', name: '除数是两位数的除法', description: '试商与调商' },
    ],
    [Semester.SECOND]: [
      { id: 'g4-s2-arithmetic', name: '四则运算', description: '含括号的混合运算' },
      { id: 'g4-s2-decimal-add', name: '小数的加减法', description: '小数点对齐' },
      { id: 'g4-s2-unit', name: '单位换算', description: '长度、面积、重量单位' },
    ]
  },
  [GradeLevel.FIVE]: {
    [Semester.FIRST]: [
      { id: 'g5-s1-decimal-mul', name: '小数乘法', description: '积的小数点位置' },
      { id: 'g5-s1-decimal-div', name: '小数除法', description: '商的小数点位置' },
      { id: 'g5-s1-equation', name: '简易方程', description: '解简单方程 (x)' },
    ],
    [Semester.SECOND]: [
      { id: 'g5-s2-factor', name: '因数与倍数', description: '质数、合数、公因数' },
      { id: 'g5-s2-frac-add', name: '分数的加减法', description: '异分母分数运算' },
      { id: 'g5-s2-cube', name: '长方体与正方体', description: '表面积与体积计算' },
    ]
  },
  [GradeLevel.SIX]: {
    [Semester.FIRST]: [
      { id: 'g6-s1-frac-mul', name: '分数乘法', description: '分数乘整数/分数' },
      { id: 'g6-s1-frac-div', name: '分数除法', description: '倒数与除法' },
      { id: 'g6-s1-percent', name: '百分数', description: '百分数与小数分数互化' },
    ],
    [Semester.SECOND]: [
      { id: 'g6-s2-neg', name: '负数的认识', description: '正负数基础' },
      { id: 'g6-s2-prop', name: '比例', description: '比例的基本性质' },
      { id: 'g6-s2-review', name: '小学总复习', description: '综合计算能力' },
    ]
  }
};