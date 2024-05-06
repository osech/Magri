document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-accordion__title').forEach((el) => {
        el.addEventListener('click', () => {
            
            let content = el.nextElementSibling
            
            if (content.style.maxHeight) {
                document.querySelectorAll('.faq-accordion__text').forEach((el) => {
                    el.style.maxHeight = null
                    el.style.paddingBottom = null
                    el.previousElementSibling.classList.remove('open')
                })

            } else {
                document.querySelectorAll('.faq-accordion__text').forEach((el) => {
                    el.style.maxHeight = null
                    el.style.paddingBottom = null
                    el.previousElementSibling.classList.remove('open')
                })
                content.previousElementSibling.classList.add('open')
                content.style.maxHeight = content.scrollHeight + 32 + 'px'
                content.style.paddingBottom = '32px'
            }
        })

        
    })
})
