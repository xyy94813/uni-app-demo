import { provide, inject } from 'vue';

const contextKey = Symbol('Page Context');

// const defaultStateSpace = '__DEFAULT_SPACE__';

class PageState {
  stateSpace = new Map<string, any>();
}

type CommonPageContext = {
    pageSate: PageState,
};

export const createDefaultPageContext = () => {};

export const providePageContext = <
  PageContext extends CommonPageContext = CommonPageContext,
>(
  ctx: PageContext,
) => {
  return provide<PageContext>(contextKey, ctx);
};

export const injectPageContext = <PageContext extends CommonPageContext>() =>
  inject<PageContext>(contextKey)!;
