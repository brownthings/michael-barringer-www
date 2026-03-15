/* ==========================================================================
   Michael Barringer — Main JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Copy-to-Clipboard Email --- */

  var emailLink = document.getElementById('copy-email');
  var toast = document.getElementById('toast');

  emailLink.addEventListener('click', function (e) {
    e.preventDefault();
    navigator.clipboard.writeText('michael@michaelbarringer.com');
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 2000);
  });


  /* --- Video Lightbox ---
     Project images with a data-video attribute open a modal
     with an embedded YouTube/Vimeo player.
  */

  var lightbox = document.getElementById('lightbox');
  var iframe = document.getElementById('lightbox-iframe');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  // Open lightbox when clicking a project image with data-video
  document.querySelectorAll('.project-image[data-video]').forEach(function (el) {
    el.addEventListener('click', function () {
      var videoUrl = el.getAttribute('data-video');
      iframe.src = videoUrl;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  // Close on backdrop click (outside the video)
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

});
