import { defineStore } from 'pinia';
import { TagsViewState } from '@/types';

const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    addVisitedView(view: any) {
      if (this.visitedViews.some((v) => v.path === view.path)) {
        return;
      }
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name',
        })
      );
    },
    addCachedView(view: any) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    addView(view: any) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    updateVisitedView(view: any) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});
export default useTagsViewStore;
