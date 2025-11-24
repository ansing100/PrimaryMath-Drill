export enum GradeLevel {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

export enum Semester {
  FIRST = '上学期',
  SECOND = '下学期'
}

export interface MathTopic {
  id: string;
  name: string;
  description: string;
}

export interface Curriculum {
  [key: number]: {
    [Semester.FIRST]: MathTopic[];
    [Semester.SECOND]: MathTopic[];
  };
}

export interface MathQuestion {
  question: string;
  answer: string;
}

export interface GenerationConfig {
  grade: GradeLevel;
  semester: Semester;
  topicId: string;
}

export enum AppStatus {
  IDLE,
  GENERATING,
  SUCCESS,
  ERROR
}