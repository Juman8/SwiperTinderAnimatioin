let loading = null
let navigation = null

const utils = {
    setLoading: (_loading) => {
        loading = _loading
    },
    useLoading: (val) => {
        loading&&loading.showHideLoading(val)
    },

    setNavigation: (_navigation) => {
        navigation = _navigation
    },
    getNavigation: () => {
        return navigation
    },
    setToast: (_toast) => {
        toast = _toast
    },
    showToast: (title, duration = 2000, type, data) => {
        let color = '#e74c3c';
        switch (type) {
            case 'success':
                color = '#00ccff';
                break;
            case 'warning':
                color = '#ff9900';
                break;
        }
        
        toast && toast.show(title, color, duration)
    },
}

export default utils