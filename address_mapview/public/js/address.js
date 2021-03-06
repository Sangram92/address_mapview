frappe.ui.form.on("Address", {
	onload: function(frm) {
		if(!frm.doc.__islocal)
			render_map_view(frm.doc.latitude, frm.doc.longitute, frm.doc.address_title)
	},

	validate: function(frm) {
		render_map_view(frm.doc.latitude, frm.doc.longitute, frm.doc.address_title)
	},
	display_map: function(frm) {
		render_map_view(frm.doc.latitude, frm.doc.longitute, frm.doc.address_title)
		frm.save();
		setTimeout(function () {
			$('[data-fieldname=latitude]')[0].scrollIntoView(true);
		}, 1000);
	}
})

render_map_view = function(lat, lon, name) {
	if(!lon || !lat) {
		$("#mapid").remove();
		html = $(frappe.render_template("map_view"))
		$(cur_frm.fields_dict.map_view.wrapper).html(html);
		cur_frm.refresh_field("map_view");
		return;
	}
	$("#mapid").remove();
	html = $(frappe.render_template("map_view"))
	$(cur_frm.fields_dict.map_view.wrapper).html(html);

	var mymap = L.map('mapid').setView([flt(lat),flt(lon)], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2FuZ3JhbXBhdGlsIiwiYSI6ImNqMWQ3MW1iMzAwMDQycWx2NnFyODIyMTcifQ.j9OBspGR0XY5ur6yVbe2Dw', {
		maxZoom: 20,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	var marker = L.marker([lat,lon]).addTo(mymap);
	cur_frm.refresh_field("map_view");
}