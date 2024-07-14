const observeElements = (elements, activate) => {
    
    const observer = new IntersectionObserver(
        ([entry]) => {
            if(entry.isIntersecting) {
                activate()
            }
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }
    );

    let eKeys = Object.keys(elements);
    for(let i = 0; i < eKeys.length; i++) {
        if (elements[eKeys[i]]) {
            observer.observe(elements[eKeys[i]]);
        }
    }

    return observer;

}

export default observeElements;