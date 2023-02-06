import { computed, defineAsyncComponent } from 'vue';

export const useDynamicLoadComponent = (pathWithoutTheme = '') => {
    const dynamicLoadComponent = computed(() => {
        const activeTemplate = 'first';

        return defineAsyncComponent({
            loader: () => import(`@/components/${activeTemplate}/${pathWithoutTheme}.vue`),
            onError: (error) => {
                    console.error(error);
            }
        });
    });

    return {
        dynamicLoadComponent
    };
};
