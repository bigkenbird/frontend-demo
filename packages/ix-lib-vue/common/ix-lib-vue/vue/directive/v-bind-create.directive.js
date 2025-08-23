export const vBindCreate = {
    created(el, binding) {
        if (binding.arg === 'created' && binding.value)
            binding.value(el);
    },
    beforeMount(el, binding) {
        if (binding.arg === 'beforeMount' && binding.value)
            binding.value(el);
    },
    mounted(el, binding) {
        if (binding.arg !== 'created' && binding.arg !== 'beforeMount' && binding.value)
            binding.value(el);
    }
};
