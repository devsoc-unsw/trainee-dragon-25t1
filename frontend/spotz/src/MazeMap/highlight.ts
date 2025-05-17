import { MazeMapProps, POI } from './constants/types';
import { getProp } from './utils';

export const clearHighlighter = (highlighterRef: any) => {
  if (highlighterRef.current) {
    highlighterRef.current.clear();
  }
};

export const initialiseHighlighter = (mapRef: any, props: MazeMapProps) => {
  if (!props.highlighter) return;
  const outline = props.highlighter.outline;
  const fill = props.highlighter.fill;
  const outlineColour = getProp(
    props,
    'highlighter',
    'outlineColour',
    window.Mazemap.Util.Colors.MazeColors.MazeBlue
  );
  const colour = getProp(
    props,
    'highlighter',
    'colour',
    window.Mazemap.Util.Colors.MazeColors.MazeBlue
  );

  return new window.Mazemap.Highlighter(mapRef.current, {
    showOutline: outline,
    showFill: fill,
    outlineColor: outlineColour,
    fillColor: colour,
  });
};

export const highlightPoi = async (poi: POI, highlighterRef: any) => {
  if (!highlighterRef.current) return;
  await highlighterRef.current.highlight(poi);
};
