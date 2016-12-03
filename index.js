(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://ssl.google-analytics.com/ga.js','ga');

ga('create', 'UA-88419205-1', 'auto');
ga('send', 'pageview');

$(function () {
  function wikiCall (query) {
    $('#content').empty()
    $.getJSON(
      'https://en.wikipedia.org/w/api.php?action=opensearch&list=search&search=' + query + '&utf8&format=json',
      function (r) {
        var results = r[1]
        var descriptions = r[2]
        var links = r[3]
        for(var i = 0; i < results.length; i++) {
          $('#content').append('<a href=' + links[i] + ' target="_blank"><div class="result"><h3>' + results[i] + '</h3><p>' + descriptions[i] +'</p></div></a>')
        }
      })
  }

  if(localStorage.getItem('lastSearched') !== null) $('#lS').text(localStorage.getItem('lastSearched'))

  if (localStorage.getItem('currentSearch') !== null) {
    $('#search').val(localStorage.getItem('currentSearch'))
    wikiCall(localStorage.getItem('currentSearch'))
  }

  $('#lS').click(function () {
    wikiCall($(this).text())
  })

  $('#search').keyup(function (e) {
    localStorage.setItem('currentSearch', $(this).val())
    localStorage.setItem('lastSearched', $(this).val())
    wikiCall($(this).val())
  })
})
