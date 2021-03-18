import RaguComponent from '@/RaguComponent.vue'
import {Component} from "ragu-dom";
import waitForExpect from "wait-for-expect";
import {render} from "@testing-library/vue";


describe('HelloWorld.vue', () => {
  const stubLoader = {
    load() {
      return Promise.reject(new Error('any load error'));
    },
    hydrationFactory() {
      return Promise.reject(new Error('any hydration'));
    }
  };

  const src = "http://my-micro-url";

  const componentResponse: Component<any, any> = {
    resolverFunction: 'la',
    state: {},
    props: {},
    client: 'client_url',
    html: 'Hello, World',
    render: async  () => {
    }
  };

  describe('rendering a component', () => {
    it('renders the component html', async () => {
      const loadStub = jest.fn(() => Promise.resolve(componentResponse));

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }

      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        }
      })

      await waitForExpect(() => {
        expect(component.getByText('Hello, World')).not.toBeNull();
      });

      expect(loadStub).toBeCalledWith(src);
    });

    it('hydrates the content', async () => {
      const componentResponseWithHydration: Component<any, any> = {
        ...componentResponse,
        render: async  (el) => {
          el.innerHTML = 'Hydrated hello!'
        }
      };

      const loadStub = jest.fn(() => Promise.resolve(componentResponseWithHydration));

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }


      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        }
      });

      await waitForExpect(() => {
        expect(component.getByText('Hydrated hello!')).not.toBeNull();
      });
    });
  });

  describe('disconnecting', () => {
    it('disconnects the component when unmount', async () => {
      const disconnectStub = jest.fn();
      const loadStub = jest.fn(() => Promise.resolve({...componentResponse, disconnect: disconnectStub}));

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }

      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        }
      });

      setTimeout(() => {
        component.unmount();
      }, 0);

      await waitForExpect(() => {
        expect(disconnectStub).toBeCalled();
      });
    });
  });

  it('updates the html when src changes', async () => {
    const loadStub = jest.fn((src) => Promise.resolve({
      ...componentResponse,
      html: src
    }));

    const resolvedStubLoader = {
      ...stubLoader,
      load: loadStub
    }

    const component = render(RaguComponent, {
      propsData: {
        src,
        loader: resolvedStubLoader
      }
    })

    const src2 = "http://my-src-updated";

    await component.updateProps({
      src: src2
    });

    await waitForExpect(() => {
      expect(component.getByText(src2)).not.toBeNull();
    });
  });

  describe('event handling', () => {
    it('calls a fetch completed event after fetch', async () => {
      const loadStub = jest.fn(() => Promise.resolve(
          {...componentResponse, hydrate: () => new Promise(() => {})}
      ));

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }

      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        },
      })

      await waitForExpect(() => expect(Object.keys(component.emitted())).toContain('fetched'));
    });

    it('calls a fetch fail event after fetch', async () => {
      const loadStub = jest.fn(() => Promise.reject());

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }

      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        },
      })

      await waitForExpect(() => expect(Object.keys(component.emitted())).toContain('fetch-fail'));
    });

    it('calls a hydrated completed event after hydrate', async (done) => {
      const loadStub = jest.fn(() => Promise.resolve({
        ...componentResponse,

        render: () => new Promise<void>((resolve) => {
              expect(Object.keys(component.emitted())).not.toContain('rendered');

              resolve();

              waitForExpect(() => expect(Object.keys(component.emitted())).toContain('rendered')).then(done)
            }
        )
      }));

      const resolvedStubLoader = {
        ...stubLoader,
        load: loadStub
      }

      const component = render(RaguComponent, {
        propsData: {
          src,
          loader: resolvedStubLoader
        },
      })
    });
  });
});
