var codes = [
  [
    [ 'I', 'I', 'II', 'III' ],  // 0-0
    [ 'I', 'II', '??', 'IV' ], // 0-1
    [ 'II', '??', 'III', 'IV' ], // 0-2
    [ 'II', 'III', 'III', 'IV' ] // 0-3
  ],
  [
    [ 'I', 'I', 'II', 'III' ], // 1-0
    [ 'I', 'II', 'III', 'IV' ], // 1-1
    [ 'II', 'III', 'IV', 'IV' ], // 1-2
    [ 'III', 'III', 'IV', 'IV' ]  // 1-3
  ],
  [
    [ 'II', 'II', 'III', 'IV' ], // 2-0
    [ 'III', 'III', 'IV', 'IV' ], // 2-1
    [ 'III', 'IV', 'IV', 'IV' ], // 2-2
    [ 'IV', 'IV', 'IV', 'IV' ]  // 2-3
  ],
  [
    [ 'III', 'III', 'IV', 'IV' ], // 3-0
    [ 'IV', 'IV', 'IV', 'IV' ], // 3-1
    [ 'IV', 'IV', 'IV', 'IV' ], // 3-2
    [ 'IV', 'IV', 'IV', 'IV' ]  // 3-3
  ]
];

function _formChangeHandler() {
  document.getElementById('results').innerHTML = '';

  var w = $('input[name="w"]:checked').val();
  var i = $('input[name="i"]:checked').val();
  var fi = $('input[name="fi"]:checked').val();

  var placeholder = document.getElementById('placeholder');
  if (w && i && fi) {
    placeholder.style.display = 'none';
    document.getElementById('results').innerHTML = "Class = " + codes[w][i][fi];
    document.getElementById('results').style.display = 'block';
  } else {
    placeholder.style.display = 'inline';
    document.getElementById('results').style.display = 'none';
  }
}

$(document).ready(function() {
  $('#stageForm').change(_formChangeHandler);
});
