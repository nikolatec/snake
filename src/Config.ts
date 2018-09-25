const W = innerWidth;
const H = innerHeight;
const PIXEL = 10;
const SCENE_PIXEL_TIMES_WIDTH = Math.floor(W / PIXEL);
const SCENE_PIXEL_TIMES_HEIGHT = Math.floor(H / PIXEL);

export default {
  PIXEL: PIXEL,
  SCENE_PIXEL_TIMES_WIDTH,
  SCENE_PIXEL_TIMES_HEIGHT,
  SCENE_WIDTH:  W,
  SCENE_HEIGHT: H,
};