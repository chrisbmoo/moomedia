#!/bin/bash
# Downloads the moomedia images from the current WordPress site into ./images
# Double-click this file (or run it in Terminal) from inside the site folder.
cd "$(dirname "$0")"
mkdir -p images
BASE='https://www.moomedia.com.au/wp-content/uploads'
fail=0
for p in \
  2021/02/BCYF_Kindergarten_Hero_main_shot.jpg \
  2021/02/St-thomas-aquinas-pic.jpg \
  2016/04/aboutbanner.jpg \
  2016/04/asthmavidthumb.jpg \
  2016/04/banner2-e1460517142179.jpg \
  2016/04/banner3.jpg \
  2016/04/barwonhealth.png \
  2016/04/bellarine.png \
  2016/04/bellarineescorted.jpg \
  2016/04/bendigo.png \
  2016/04/bhealthhospitalappeal.jpg \
  2016/04/bhealthrecruit.jpg \
  2016/04/blurry.jpg \
  2016/05/bulbs.jpg \
  2016/04/chamber.png \
  2016/04/contactbanner.jpg \
  2016/04/cottonon.jpg \
  2016/04/cropped-favicon-1-1-180x180.png \
  2016/04/cropped-favicon-1-1-192x192.png \
  2016/04/cropped-favicon-1-1-32x32.png \
  2016/07/ctvwebnewfs.jpg \
  2018/07/design01_logos_bethany.jpg \
  2016/04/design01_logos_ctv.jpg \
  2016/04/design01_logos_dooleys_premium_ice_cream.jpg \
  2016/04/design01_logos_geelong_connected_communities.jpg \
  2016/04/design01_logos_grove_pavilion.jpg \
  2016/04/designcover-1.jpg \
  2016/05/designicon.png \
  2016/04/digitalmarketinggpac.jpg \
  2016/04/extinction.jpg \
  2016/05/extinctionad.jpg \
  2016/04/gcc.png \
  2016/07/gccimg1.jpg \
  2016/05/gccnewsletter.jpg \
  2016/04/gpac.png \
  2016/04/gpacedm.jpg \
  2016/07/grapefarm.jpg \
  2016/04/gsobrochure.jpg \
  2016/04/insidepic.jpg \
  2016/04/manualimage2.jpg \
  2016/05/marketing.png \
  2016/04/marketingbanner.jpg \
  2016/05/moo_geelong_connected_communities-design.jpg \
  2016/05/moo_media-alcoa_history_book_anglesea-front_cover-design.jpg \
  2016/05/moo_media-batesford_hotel-design.jpg \
  2016/05/moo_media-gpac_theatre_season-front_cover-design-1.jpg \
  2016/04/moologo.png \
  2016/04/paulcow.jpg \
  2016/04/pencils.jpg \
  2016/04/ptech.jpg \
  2016/04/seaboy1.jpg \
  2016/04/signage01_awa.jpg \
  2016/04/signage01_gpac.jpg \
  2016/04/sister2.jpg \
  2016/05/social.png \
  2016/05/soundrecording.png \
  2016/04/stjog.png \
  2016/04/stocklandthumb.jpg \
  2016/04/symphony.png \
  2016/04/theatrepic.jpg \
  2016/04/videobanner-1.jpg \
  2016/05/videoicon.png \
  2016/04/webcover-2.jpg \
  2016/05/websitedesign.png \
  2016/04/wordforword-1.jpg \
  2016/05/wordforwordad2.jpg \
  2016/07/yogaimg1.jpg \
; do
  f="images/$(basename "$p")"
  if [ ! -s "$f" ]; then curl -fsSL "$BASE/$p" -o "$f" && echo "✓ $f" || { echo "✗ $p"; fail=1; }; fi
done
echo; [ $fail = 0 ] && echo "All images downloaded." || echo "Some images failed – run it again."
