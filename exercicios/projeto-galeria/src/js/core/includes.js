import $ from 'jquery'

const loadHTMLSuccessCB = []

export function onLoadHTMLSuccess(callback){
    if(!loadHTMLSuccessCB.includes(callback)){
        loadHTMLSuccessCB.push(callback)
    }
}




function loadIncludes(parent){
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e){
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHTMLSuccessCB.forEach(callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()