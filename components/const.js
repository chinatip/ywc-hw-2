import { media, mediaExceed } from '../utils/media-style';
export { media, mediaExceed };

export const dataURL = 'https://ywc15.ywc.in.th/api/interview';

const content = 'content';
const design = 'design';
const marketing = 'marketing';
const programming = 'programming';
const all = 'all';

export const TABS = [all, content, design, marketing, programming];
export const MAJORS = [content, design, marketing, programming];
export const TITLE_MAJORS = {
  content: 'Web Content',
  design: 'Web Design',
  marketing: 'Web Marketing',
  programming: 'Web Programming',
  all: 'All Majors'
};

export const COLOR_MAJORS = {
  content: '#1ab2fc',
  design: '#fef228',
  marketing: '#f32936',
  programming: '#07cfac',
  all: '#ff9800'
};
export const COLOR_FADE_MAJORS = {
  content: 'rgba(26, 178, 252, 0.1)',
  design: 'rgba(254, 242, 40, 0.22)',
  marketing: 'rgba(243, 41, 54, 0.1)',
  programming: 'rgba(7, 207, 171, 0.1)',
  all: 'rgba(255, 152, 0, 0.2)'
};

export const dataFormat = {
  interviewRef: 'ID', 
  firstName: 'Firstname',
  lastName: 'Lastname', 
  major: 'Major'
};

export const font = `'Prompt', sans-serif`;
export const textColor = '#66fcf1';

export const imgSource = (value) => {
  if (value === all) return null;
  return `/static/${value}.png`;
};

export const FBimgSource = (fbId) => {
  return `http://graph.facebook.com/${fbId}/picture?type=square`;
};

export const FBProfile = (fbId) => {
  if(!fbId) return ;
  return `http://www.facebook.com/${fbId}`;
};