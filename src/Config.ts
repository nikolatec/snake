const W = innerWidth;
const H = innerHeight;
const PIXEL = 5;
const SCENE_PIXEL_TIMES_WIDTH = Math.floor(W / PIXEL);
const SCENE_PIXEL_TIMES_HEIGHT = Math.floor(H / PIXEL);
const SNAKES = 500;
const APPLES = 2000;
const FPS = 60;

export default {
  FPS,
  PIXEL: PIXEL,
  SCENE_PIXEL_TIMES_WIDTH,
  SCENE_PIXEL_TIMES_HEIGHT,
  SCENE_WIDTH:  W,
  SCENE_HEIGHT: H,
  SNAKES,
  APPLES
};