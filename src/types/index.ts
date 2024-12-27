export type Tuser = {
  email: string;
  role: "OWNER";
};

export type ProductCardProps = {
  id?: string;
  name: string;
  photo?: string;
  category?: string;
  description: string;
  github?: string;
  live?: string;
};

export type TupdateProduct = {
  id?: string;
  name?: string;
  photo?: string;
  category?: string;
  description?: string;
  github?: string;
  live?: string;
};

export type TBlog = {
  id?: string;
  title: string;
  subtitle: string;
  content: string;
  photo: string;
  category: string;
};
export type TBlogUpdate = {
  id?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  photo?: string;
  category?: string;
};

export type TSkill = {
  id?: string;
  name: string;
  level: string;
};
export type TSkillUpdate = {
  id?: string;
  name?: string;
  level?: string;
};

export type TExperience = {
  id?: string;
  title: string;
  company: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
};
export type TExperienceUpdate = {
  id?: string;
  title?: string;
  company?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
};
