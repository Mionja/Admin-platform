import React from 'react'

function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Note <span className='text-info'>'EO</span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/student">Etudiants <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/module">Modules</a>
      </li>
     
      <li class="nav-item">
        <a class="nav-link" href="/teacher">Professeurs</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/mark">Notes</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/retake-exam">Rattrapages</a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/result">Resultats</a>
      </li>
      {/* <li class="nav-item">
        <a class="nav-link" href="/historic">Historiques</a>
      </li> */}
    </ul>
  </div>
</nav>
    </div>
  )
}

export default Navbar
