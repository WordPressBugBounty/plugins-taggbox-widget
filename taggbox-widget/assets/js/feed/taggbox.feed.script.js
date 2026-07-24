/*--Start--Create Feed According Filters*/
var __taggbox__feed_filters = document.querySelector("#__taggbox__feed_filters");
if (__taggbox__feed_filters) {
	__taggbox__feed_filters.addEventListener("change", function (event) {
		let __taggbox__toast = new TaggboxToast;
		/*Manage Widget Error*/
		let widgetData = document.querySelector("#__taggbox__widgets").selectedOptions[0];
		let widgetId = widgetData.value.split('#')[0];
		let widgetName = widgetData.value.split('#')[1];
		let networkData = document.querySelector("#__taggbox__networks").selectedOptions[0].value;
		let networkId = networkData.split('#')[0];
		let networkName = networkData.split('#')[1];
		let filterId = event.target.value.split('#')[0];
		let filterName = event.target.value.split('#')[1];
		if (!networkId || !networkName || !widgetId || !widgetName || !filterName || !filterId) {
			__taggbox__feed_filters.selectedIndex = 0;
			return;
		}
		let __taggbox__feed_data = { 'widgetId': widgetId, 'widgetName': widgetName, 'networkId': networkId, 'networkName': networkName, 'filterId': filterId, 'filterName': filterName };
		__taggbox__feed_data.inputs = [];
		switch (__taggbox__feed_data.networkId) {
			case "1":
				__taggbox__createTwitterFeed(__taggbox__feed_data);
				break;
			case "2":/*Note : This Use For Merge Instagram 2/18*/
			case "18":
				networkId = __taggbox__feed_data.filterId == 1 || __taggbox__feed_data.filterId == 66 ? 2 : 18;
				__taggbox__get_already_exist_auth_new(networkId, __taggbox__feed_data);
				break;
			case "3":
				__taggbox__createFacebookFeed(__taggbox__feed_data);
				break;
			case "4":
				__taggbox__createGoogleFeed(__taggbox__feed_data);
				break;
			case "5":
				__taggbox__createPinterestFeed(__taggbox__feed_data);
				break;
			case "6":
				__taggbox__createFlickrFeed(__taggbox__feed_data);
				break;
			case "7":
				__taggbox__createYoutubeFeed(__taggbox__feed_data);
				break;
			case "8":
				__taggbox__createVimeoFeed(__taggbox__feed_data);
				break;
			case "10":
				__taggbox__createLinkdinFeed(__taggbox__feed_data);
				break;
			case "11":
				__taggbox__createTumblrFeed(__taggbox__feed_data);
				break;
			case "12":
				__taggbox__createRssFeed(__taggbox__feed_data);
				break;
			case "19":
				__taggbox__createYelpFeed(__taggbox__feed_data);
				break;
			case "20":
				__taggbox__createSlackFeed(__taggbox__feed_data);
				break;
			case "23":
				__taggbox__createAirbnbFeed(__taggbox__feed_data);
				break;
			/*case"28":
			__taggbox__createCapeterraFeed(__taggbox__feed_data);
			break;*/
			case "36":
				__taggbox__createEtsyFeed(__taggbox__feed_data);
				break;
			case "28":
				__taggbox__createTiktokFeed(__taggbox__feed_data);
				break;
			case "32":
				__taggbox__createVkFeed(__taggbox__feed_data);
				break;
			case "34":
				__taggbox__createAmazonFeed(__taggbox__feed_data);
				break;
			case "35":
				__taggbox__createTripadvisorFeed(__taggbox__feed_data);
				break;
			case "37":
				__taggbox__createAliexpressFeed(__taggbox__feed_data);
				break;
			default:
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
				return;
				break;
		}
	});
}
/*--End--Create Feed According Filters*/
/*--Start--Create Twitter Feed*/
function __taggbox__createTwitterFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	let __taggbox__common_inputs = [{ label: 'Add Multiple Photos', type: 'checkbox', name: 'multiplePhoto' }, { label: 'Exclude Retweets', type: 'checkbox', name: 'excludeRetweet' }];
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'User Handle', type: 'text', name: 'feed', placeholder: 'Enter User handle' }].concat(__taggbox__common_inputs);
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'HashTag', type: 'text', name: 'feed', placeholder: 'Enter HashTag' }].concat(__taggbox__common_inputs);
			break;
		case "3":
			__taggbox__feed_data.inputs = [{ label: 'User Name', type: 'text', name: 'feed', placeholder: 'Enter User Name' }, { label: 'List Id', type: 'text', name: 'list', placeholder: 'Enter List Id' }].concat(__taggbox__common_inputs);
			break;
		case "4":
			__taggbox__feed_data.inputs = [{ label: 'The Twitter Handle Of The User To Import Favorites From', type: 'text', name: 'feed', placeholder: 'Enter The Twitter Handle Of The User To Import Favorites From' }].concat(__taggbox__common_inputs);
			break;
		case "5":
			__taggbox__feed_data.inputs = [{ label: 'Query', type: 'text', name: 'feed', placeholder: 'to:taggbox' }].concat(__taggbox__common_inputs);
			break;
		case "7":
			__taggbox__feed_data.inputs = [{ label: 'User Mention', type: 'text', name: 'feed', placeholder: 'Enter User Mention' }].concat(__taggbox__common_inputs);
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Twitter Feed*/
/*--Start--Create Instagram Feed*/
function __taggbox__createInstagramFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Instagram Feed*/
/*--Start--Create Facebook Feed*/
function __taggbox__createFacebookFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	let setOnlyParentNetwork = (__taggbox__feed_data.filterId == 1 || __taggbox__feed_data.filterId == 8) ? true : false;/*Manage Connected Account On Facebook Handel Time */
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth(setOnlyParentNetwork);
	switch (__taggbox__feed_data.filterId) {
		case "1":
			break;
		case "8":
			__taggbox__feed_data.inputs = [{ label: 'Facebook Page', type: 'text', name: 'facebookPage', placeholder: 'Enter Page URL Or Page Name', id: '__taggbox__facebook_search_page', jsFunction: 'onkeyup="__taggbox__manageFacebookPageSearchOptions();"', extraTag: 'search_option', inputLoader: 'facebook_page_search_loader' }, { id: '__taggbox__facebook_feed', type: 'hidden', name: 'feed' }];
			break;
		case "55":
			break;
		case "62":
			break;
		case "65":
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0) {
		switch (__taggbox__feed_data.filterId) {
			case "65":
				let options = [{ name: 'All Facebook Page Album', value: '67' }, { name: 'Single Album', value: '65' }];
				__taggbox__feed_data.inputs = [{ label: 'Select Album Type', type: 'select', name: 'accountAlbumType', id: '__taggbox__account_album_type', jsFunction: 'onChange="__taggbox__getFacebookPageAlbums();"', options: options, extraTag: 'account_album_section', taggboxformwrowId: '__taggbox__facebook_album_section' }];
				break;
		}
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--Start--Get Facebook Page Album*/
function __taggbox__getFacebookPageAlbums() {
	let __taggbox__connected_accountsId = document.querySelector("#__taggbox__connected_accounts").selectedOptions[0].value;
	let __taggbox__account_album_type = document.querySelector("#__taggbox__account_album_type").selectedOptions[0].value;
	let __taggbox__account_album_section = document.querySelector("#__taggbox__account_album_section");
	if (__taggbox__account_album_type == 65) {
		__taggbox__open_loader();
		let __taggbox__toast = new TaggboxToast;
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('connectedAccountsId', __taggbox__connected_accountsId);
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__get_facebook_page_albums');
		fetch(__taggbox__ajax_url, {
			method: 'POST',
			headers: {
				'x-requested-with': 'XMLHttpRequest',
			},
			body: formData,
		}).then(response => {
			return response.json()
		}).then(response => {
			__taggbox__close_loader();
			if (response.status == true) {
				let elemHTML = `<label>Select Album</label><select name="accountAlbumData" id="__taggbox__account_album_data">`;
				if (response.data) {
					for (let index in response.data)
						elemHTML = `${elemHTML} <option value="${response.data[index].id}#${response.data[index].name}">${response.data[index].name}</option>`;
				} else {
					elemHTML = `${elemHTML} <option value="">This Facebook Pase Album Not Found</option>`;
				}
				elemHTML = `${elemHTML} </select>`;
				__taggbox__account_album_section.style.display = 'block';
				__taggbox__account_album_section.innerHTML = elemHTML;
			} else {
				__taggbox__account_album_section.innerHTML = '';
				__taggbox__account_album_section.style.display = 'none';
				__taggbox__close_loader();
				if (response.hasOwnProperty("message")) {
					__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
				} else {
					__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				}
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__account_album_section.innerHTML = '';
			__taggbox__account_album_section.style.display = 'none';
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
		});
	} else {
		__taggbox__account_album_section.innerHTML = '';
		__taggbox__account_album_section.style.display = 'none';
	}

}
/*--End--Get Facebook Page Album*/
/*--Start-- Search Facebook And Manage Facebook Page Data*/
function __taggbox__manageFacebookPageSearchOptions() {
	let __taggbox__facebook_search_page = document.getElementById('__taggbox__facebook_search_page').value;
	let __taggbox__feed_error = document.getElementById('__taggbox__facebookPage_error');
	if (__taggbox__facebook_search_page.length > 2) {
		__taggbox__feed_error.textContent = "";
		if (__taggbox__facebook_search_page.includes('facebook.com/')) {
			try {
				if (!__taggbox__facebook_search_page.startsWith('http://') && !__taggbox__facebook_search_page.startsWith('https://')) {
					__taggbox__facebook_search_page = 'https://' + __taggbox__facebook_search_page;
				}

				let url = new URL(__taggbox__facebook_search_page);
				if (url.hostname.includes('facebook.com')) {
					let pathAfterFacebook = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;
					if (pathAfterFacebook) {
						__taggbox__facebookSearchData('', __taggbox__facebook_search_page, __taggbox__facebook_search_page);
						return false;
					} else {
						__taggbox__feed_error.innerHTML = "No specific path found after 'facebook.com'";
					}
				} else {
					__taggbox__feed_error.innerHTML = "The URL does not belong to 'facebook.com'";
				}
			} catch (error) {
				__taggbox__feed_error.innerHTML = "Invalid URL";
			}
		} else {
			let __taggbox__toast = new TaggboxToast;
			__taggbox__facebook_page_search_loader = document.getElementById('__taggbox__facebook_page_search_loader');
			__taggbox__facebook_page_search_loader.style.display = 'block';
			let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
			__taggbox__search_option.style.display = "none";
			__taggbox__search_option.innerHTML = "";

			let formData = new FormData();
			formData.append('action', 'taggbox_data');
			formData.append('facebookPageData', __taggbox__facebook_search_page);
			formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
			formData.append('__taggbox__ajax_action', '__taggbox__search_facebook_page');
			fetch(__taggbox__ajax_url, {
				method: 'POST', headers: { 'x-requested-with': 'XMLHttpRequest' }, body: formData,
			}).then(response => {
				return response.json();
			}).then(response => {
				if (response.status == true) {
					__taggbox__search_option.style.display = 'block';
					let elemHTML = `<ul>`;
					if (response.data.length > 0) {
						for (let index in response.data)
							elemHTML = `${elemHTML} <li style="font-weight:500; line-height:normal;" onClick="__taggbox__facebookSearchData('${response.data[index].name}','${response.data[index].link}')" value="${response.data[index].link}">${response.data[index].name} <span style="display:block; line-height:normal; font-weight:normal; margin-top:3px;">${response.data[index].link}</span></li>`;
					} else {
						elemHTML = `${elemHTML} <li value="">Not Found</li>`;
					}
					elemHTML = `${elemHTML} </ul>`;
					__taggbox__search_option.innerHTML = elemHTML;
					__taggbox__facebook_page_search_loader.style.display = 'none';
				} else {
					__taggbox__search_option.innerHTML = "";
					__taggbox__facebook_page_search_loader.style.display = 'none';
					if (response.hasOwnProperty("message")) {
						__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
					} else {
						__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
					}
				}
			}).catch((error) => {
				__taggbox__search_option.innerHTML = "";
				__taggbox__facebook_page_search_loader.style.display = 'none';
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			});
		}
	} else {
		__taggbox__search_option.style.display = "none";
		__taggbox__feed_error.innerHTML = "Enter Minimum 3 Characters";
		__taggbox__feed_error.style.display = 'block';
		__taggbox__search_option.innerHTML = "";
		__taggbox__facebook_page_search_loader.style.display = 'none';
	}
}
function __taggbox__facebookSearchData(__taggbox__page_name, __Taggbox__page_link) {
	document.getElementById("__taggbox__facebook_search_page").value = __taggbox__page_name;
	document.getElementById("__taggbox__facebook_feed").value = __Taggbox__page_link;
	document.getElementById("__taggbox__search_option").style.display = 'none';
}
/*--End-- Search Facebook And Manage Facebook Page Data*/
/*--End--Create Facebook Feed*/
/*--Start--Create Google Feed*/
function __taggbox__createGoogleFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "29":
			/*Already Exist Accounts*/
			let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
			if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
				__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
			break;
		case "33":
			__taggbox__feed_data.inputs = [{ label: 'Search', id: '__taggbox__google_location', jsFunction: 'onkeyup="__taggbox__searchGoogleLocation();"', type: 'text', name: 'feed', placeholder: 'Webster, NY, USA', extraTag: 'search_option', inputLoader: 'google_location_search_loader' }, { id: '__taggbox__place_id', type: 'hidden', name: 'placeId' }, { id: '__taggbox__place_name', type: 'hidden', name: 'placeName' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--Start-- Search Google Location And Find Place Id*/
function __taggbox__searchGoogleLocation() {
	let __taggbox__google_location = document.querySelector("#__taggbox__google_location").value;
	let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
	let __taggbox__google_location_search_loader = document.querySelector("#__taggbox__google_location_search_loader");
	if (__taggbox__google_location && __taggbox__google_location.length > 3) {
		__taggbox__google_location_search_loader.style.display = 'block';
		/*__taggbox__search_option.innerHTML = '';*/
		let __taggbox__toast = new TaggboxToast;
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('googleLocationName', __taggbox__google_location);
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__search_google_location');
		fetch(__taggbox__ajax_url, {
			method: 'POST',
			headers: {
				'x-requested-with': 'XMLHttpRequest',
			},
			body: formData,
		}).then(response => {
			return response.json()
		}).then(response => {
			if (response.status == true) {
				let elemHTML = `<ul>`;
				if (response.data) {
					for (let index in response.data)
						elemHTML = `${elemHTML} <li onClick="__taggbox__manageGoogleSearchData('${response.data[index].place_id}','${response.data[index].structured_formatting.main_text}','${response.data[index].description}')" value="${response.data[index].place_id}"> <img src="${__taggbox__plugin_url_for_js}assets/images/feeds/location.svg" alt="image" />${response.data[index].description}</li>`;
				} else {
					elemHTML = `${elemHTML} <li value="">Not Found</li>`;
				}
				elemHTML = `${elemHTML} </ul>`;
				__taggbox__search_option.innerHTML = elemHTML;
				__taggbox__google_location_search_loader.style.display = 'none';
			} else {
				__taggbox__search_option.innerHTML = '';
				__taggbox__google_location_search_loader.style.display = 'none';
				if (response.hasOwnProperty("message")) {
					__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
				} else {
					__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				}
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__search_option.innerHTML = '';
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			__taggbox__google_location_search_loader.style.display = 'none';
		});
	} else {
		__taggbox__search_option.innerHTML = '';
		__taggbox__google_location_search_loader.style.display = 'none';
	}
}
function __taggbox__manageGoogleSearchData(__taggbox__place_id, __taggbox__place_name, __taggbox__place_description) {
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__place_id || !__taggbox__place_name || !__taggbox__place_description)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	document.querySelector("#__taggbox__google_location").value = __taggbox__place_description;
	document.querySelector("#__taggbox__place_id").value = __taggbox__place_id;
	document.querySelector("#__taggbox__place_name").value = __taggbox__place_name;
	document.querySelector("#__taggbox__search_option").innerHTML = '';
}
/*--End-- Search Google Location And Find Place Id*/
/*--End--Create Google Feed*/
/*--Start--Create Pintrest Feed*/
function __taggbox__createPinterestFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'User Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle' }];
			break;
		case "12":
			__taggbox__feed_data.inputs = [{ label: 'Board Url', type: 'text', name: 'feed', placeholder: 'Enter Board Url : https://in.pinterest.com/taggbox/taggbox-social-blog/' }];
			break;
		case "71":
			__taggbox__feed_data.inputs = [{ label: 'User Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Pintrest Feed*/
/*--Start--Create Flickr Feed*/
function __taggbox__createFlickrFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle' }];
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Flickr Feed*/
/*--Start--Create Youtube Feed*/
function __taggbox__createYoutubeFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'Channel', id: '__taggbox__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__taggbox__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__taggbox__youtubeChannelSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader' }, { id: '__taggbox__youtube_id', type: 'hidden', name: 'youtubeId' }, { id: '__taggbox__youtube_name', type: 'hidden', name: 'youtubeName' }];
			break;
		case "11":
			__taggbox__feed_data.inputs = [{ label: 'Channel', id: '__taggbox__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__taggbox__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__taggbox__youtubeChannelPlaylistSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader' }, { id: '__taggbox__youtube_id', type: 'hidden', name: 'youtubeId' }, { id: '__taggbox__youtube_name', type: 'hidden', name: 'youtubeName' }];
			break;
		case "4":
			__taggbox__feed_data.inputs = [{ label: 'Keyword', type: 'text', name: 'feed', placeholder: 'Enter Keyword' }];
			break;
		case "75":
			__taggbox__feed_data.inputs = [{ label: 'Channel', id: '__taggbox__youtube_channel_data', searchBtn: 'youtube', jsFunction: 'onkeyup="__taggbox__manageYoutubeSearchOptions();"', jsSearchBtnFunction: 'onclick="__taggbox__youtubeChannelSearch();"', type: 'text', name: 'feed', placeholder: 'Enter Channel URL OR Search By Channel Name', extraTag: 'search_option', inputLoader: 'youtube_channel_search_loader' }, { id: '__taggbox__youtube_id', type: 'hidden', name: 'youtubeId' }, { id: '__taggbox__youtube_name', type: 'hidden', name: 'youtubeName' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--Start-- Manage Youtube Search Options*/
function __taggbox__manageYoutubeSearchOptions() {
	let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
	if (__taggbox__search_option) {
		__taggbox__search_option.innerHTML = "";
		__taggbox__search_option.style.display = 'none';
	}
	let __taggbox__feed_error = document.querySelector("#__taggbox__feed_error");
	if (__taggbox__feed_error) {
		__taggbox__feed_error.innerHTML = "";
		__taggbox__feed_error.style.display = 'none';
	}
	document.querySelector("#__taggbox__youtube_id").value = "";
	document.querySelector("#__taggbox__youtube_name").value = "";
}
/*--End-- Manage Youtube Search Options*/
/*--Start-- Search Youtube Data */
function __taggbox__youtubeChannelSearch() {
	__taggbox__youtubeSearch("channel");
}
function __taggbox__youtubeChannelPlaylistSearch() {
	__taggbox__youtubeSearch("playlist");
}
function __taggbox__youtubeSearch(type = null) {
	/*--Start--Manage Hidden Fields*/
	document.querySelector("#__taggbox__youtube_id").value = "";
	document.querySelector("#__taggbox__youtube_name").value = "";
	let __taggbox__feed_error = document.querySelector("#__taggbox__feed_error");
	if (__taggbox__feed_error)
		__taggbox__feed_error.style.display = 'none';
	let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
	__taggbox__search_option.innerHTML = "";
	let __taggbox__input_search_youtube = document.querySelector("#__taggbox__input_search_youtube");
	__taggbox__input_search_youtube.style.display = 'none';
	let __taggbox__youtube_channel_data = document.querySelector("#__taggbox__youtube_channel_data").value;
	let __taggbox__youtube_channel_search_loader = document.querySelector("#__taggbox__youtube_channel_search_loader");
	if (__taggbox__youtube_channel_data && __taggbox__youtube_channel_data.length > 3) {
		__taggbox__youtube_channel_search_loader.style.display = 'block';
		let __taggbox__toast = new TaggboxToast;
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('youtubeChannelData', __taggbox__youtube_channel_data);
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__search_youtube_channel');
		fetch(__taggbox__ajax_url, {
			method: 'POST',
			headers: {
				'x-requested-with': 'XMLHttpRequest',
			},
			body: formData,
		}).then(response => {
			return response.json()
		}).then(response => {
			if (response.status == true) {
				__taggbox__search_option.style.display = 'block';
				let elemHTML = `<ul>`;
				if (response.data.length > 0) {
					for (let index in response.data)
						elemHTML = `${elemHTML} <li onClick="__taggbox__youtubeSearchData('${response.data[index].youtubeId}','${response.data[index].youtubeName}','${type}')" value="${response.data[index].youtubeId}"><img src="${response.data[index].youtubeImage}" alt="image" /> ${response.data[index].youtubeName}</li>`;
				} else {
					elemHTML = `${elemHTML} <li value="">Not Found</li>`;
				}
				elemHTML = `${elemHTML} </ul>`;
				__taggbox__search_option.innerHTML = elemHTML;
				__taggbox__youtube_channel_search_loader.style.display = 'none';
				__taggbox__input_search_youtube.style.display = 'flex';
			} else {
				__taggbox__search_option.innerHTML = "";
				__taggbox__youtube_channel_search_loader.style.display = 'none';
				__taggbox__input_search_youtube.style.display = 'flex';
				if (response.hasOwnProperty("message")) {
					__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
				} else {
					__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				}
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__search_option.innerHTML = "";
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			__taggbox__youtube_channel_search_loader.style.display = 'none';
			__taggbox__input_search_youtube.style.display = 'flex';
		});
	} else {
		__taggbox__feed_error.innerHTML = "Enter Minimum 4 Characters";
		__taggbox__feed_error.style.display = 'block';
		__taggbox__search_option.innerHTML = "";
		__taggbox__youtube_channel_search_loader.style.display = 'none';
		__taggbox__input_search_youtube.style.display = 'flex';
	}
}
function __taggbox__youtubeSearchData(youtubeId, youtubeName, type) {
	let __taggbox__toast = new TaggboxToast;
	if (!youtubeId || !youtubeName)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	document.querySelector("#__taggbox__youtube_channel_data").value = youtubeName;
	document.querySelector("#__taggbox__youtube_id").value = youtubeId;
	document.querySelector("#__taggbox__youtube_name").value = youtubeName;
	document.querySelector("#__taggbox__search_option").innerHTML = "";
	if (type && type == 'playlist') {
		__taggbox__getYoutubePlaylist(youtubeId);
	}
}
/*--Start--Get Youtube Channel Playlist*/
function __taggbox__getYoutubePlaylist(youtubeId) {
	let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
	__taggbox__search_option.innerHTML = "";
	__taggbox__open_loader();
	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_youtube_playlist');
	formData.append('youtubeId', youtubeId);
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: { 'x-requested-with': 'XMLHttpRequest' },
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		__taggbox__close_loader();
		if (response.status == true) {
			let elemHTML = `<label>Select Playlist</label><select name="youtubePlaylist" id="__taggbox__playlist_data">`;
			if (response.data.length > 0) {
				for (let index in response.data)
					elemHTML = `${elemHTML} <option value="${response.data[index].youtubeId}#${response.data[index].youtubeName}">${response.data[index].youtubeName}</option>`;
			} else {
				elemHTML = `${elemHTML} <option value="">Not Found</option>`;
			}
			elemHTML = `${elemHTML} </select>`;
			__taggbox__search_option.style.display = 'block';
			__taggbox__search_option.innerHTML = elemHTML;
		} else {
			__taggbox__search_option.innerHTML = "";
			__taggbox__search_option.style.display = 'none';
			__taggbox__close_loader();
			if (response.hasOwnProperty("message")) {
				__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
			} else {
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			}
		}
	}).catch((error) => {
		console.log(error);
		__taggbox__close_loader();
		__taggbox__search_option.innerHTML = "";
		__taggbox__search_option.style.display = 'none';
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	});
}
/*--End--Get Youtube Channel Playlist*/
/*--End-- Search Youtube Data */
/*--End--Create Youtube Feed*/
/*--Start--Create Vimeo Feed*/
function __taggbox__createVimeoFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	switch (__taggbox__feed_data.filterId) {
		case "1":
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Vimeo Feed*/
/*--Start--Create Linkdin Feed*/
function __taggbox__createLinkdinFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'Profile Page Url', type: 'text', name: 'feed', placeholder: 'Enter Profile Page URL' }];
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'HashTag', type: 'text', name: 'feed', placeholder: 'Enter HashTag' }];
			break;
		case "16":
			__taggbox__feed_data.inputs = [{ label: 'Post Url', type: 'text', name: 'feed', placeholder: 'Enter Post URL' }];
			break;
		case "17":
			__taggbox__feed_data.inputs = [{ label: 'Company Page Url', type: 'text', name: 'feed', placeholder: 'Enter Company Page URL' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Linkdin Feed*/
/*--Start--Create Tumblr Feed*/
function __taggbox__createTumblrFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });

	switch (__taggbox__feed_data.filterId) {
		case "1":
			__taggbox__feed_data.inputs = [{ label: 'Handel', type: 'text', name: 'feed', placeholder: 'Enter User Handle' }];
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Tumblr Feed*/
/*--Start--Create Rss Feed*/
function __taggbox__createRssFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "13":
			__taggbox__feed_data.inputs = [{ label: 'Name', type: 'text', name: 'name', placeholder: 'Enter Name' }, { label: 'Rss Url', type: 'text', name: 'feed', placeholder: 'Enter Rss URL' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Rss Feed*/
/*--Start--Create Instagram Business Feed*/
function __taggbox__createInstagramBusinessFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	switch (__taggbox__feed_data.filterId) {
		case "1":
		case "66":
			__taggbox__feed_data.networkId = 2;
			break;
		case "23":
			__taggbox__feed_data.inputs = [{ label: 'Handle Url', type: 'text', name: 'feed', placeholder: 'Enter Handle Url' }];
			break;
		case "24":
			break;
		case "25":
			break;
		case "26":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }, { label: 'Get Posts Containing Hashtag Only In Caption', type: 'checkbox', name: 'hashtagCaption' }, { label: 'Give Preference To Recent Posts Over Top Posts From The Hashtag', type: 'checkbox', name: 'hashtagOlder' }];
			break;
		case "34":
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Instagram Business Feed*/
/*--Start--Create Yelp Feed*/
function __taggbox__createYelpFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	switch (__taggbox__feed_data.filterId) {
		case "27":
		case "28":
			__taggbox__feed_data.inputs = [{ label: 'Enter Business Page Url', type: 'text', name: 'feed', placeholder: 'Enter Business Page Url' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Yelp Feed*/
/*--Start--Create Slack Feed*/
var __taggbox__searchSlackChannelList = false;
function __taggbox__createSlackFeed(__taggbox__feed_data) {
	let setOnlyParentNetwork = (__taggbox__feed_data.filterId == 1) ? true : false;/*Manage Connected Account On Facebook Handel Time */
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth(setOnlyParentNetwork); /*Already Exist Accounts*/
	switch (__taggbox__feed_data.filterId) {
		case "1":
			break;
		default:
			document.getElementById("__taggbox__create_feed_form").innerHTML = null;/*First Remove Form Data*/
			return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			break;
	}
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0) {
		switch (__taggbox__feed_data.filterId) {
			case "1":
				let options = [{ name: 'Select Channel', value: '' }];
				__taggbox__feed_data.inputs = [{ label: 'Select Slack Channel', type: 'select', name: 'slackChannelList', id: '__taggbox__account_slack_channel', options: options }];
				break;
		}
		__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
		__taggbox__searchSlackChannelList = true;/*Use For Search Slack Channel Flag*/
	}
	__taggbox__create_feed(__taggbox__feed_data);
	/*--Start-- Get And Set Channel List On First Time*/
	if (__taggbox__exist_auth.alreadyAuthOption.length > 0) {
		let __taggbox__connected_accountsId = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs)[0]['options'][0]['value'];
		__taggbox__getSlackChannelList(__taggbox__connected_accountsId);
	}
	/*--End-- Get And Set Channel List On First Time*/
}
function __taggbox__getSlackChannelList(__taggbox__connected_accountsId = null) {
	let __taggbox__get_connected_accountsId = __taggbox__connected_accountsId !== null ? __taggbox__connected_accountsId : document.querySelector("#__taggbox__connected_accounts").selectedOptions[0].value;
	if (__taggbox__get_connected_accountsId !== '') {
		let __taggbox__account_slack_channel = document.querySelector("#__taggbox__account_slack_channel");
		__taggbox__open_loader();
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('connectedAccountsId', __taggbox__get_connected_accountsId);
		formData.append('__taggbox__ajax_action', '__taggbox__get_slack_channel_list');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		fetch(__taggbox__ajax_url, {
			method: 'POST', headers: { 'x-requested-with': 'XMLHttpRequest' }, body: formData,
		}).then(response => {
			return response.json();
		}).then(response => {
			__taggbox__close_loader();
			if (response.status == true) {
				let elemHTML = ``;
				if (response.data) {
					for (let index in response.data)
						elemHTML = `${elemHTML} <option value="${response.data[index].id}#${response.data[index].name}">${response.data[index].name}</option>`;
				} else {
					elemHTML = `${elemHTML} <option value="">This Slack Channel Not Found</option>`;
				}
				elemHTML = `${elemHTML}`;
				__taggbox__account_slack_channel.innerHTML = elemHTML;
				__taggbox__account_slack_channel.parentElement.style.display = 'block';
			} else {
				__taggbox__account_slack_channel.innerHTML = '';
				__taggbox__account_slack_channel.parentElement.style.display = 'none';
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__account_slack_channel.innerHTML = '';
			__taggbox__account_slack_channel.style.display = 'none';
			return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
		});
	}
}
/*--End--Create Slack Feed*/
/*--Start--Create Airbnb Feed*/
function __taggbox__createAirbnbFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "56":
			__taggbox__feed_data.inputs = [{ label: 'Airbnb List Url', type: 'text', name: 'feed', placeholder: 'Enter List URL : https://www.airbnb.co.in/rooms/50158480' }];
			break;
		case "57":
			__taggbox__feed_data.inputs = [{ label: 'Airbnb Experience Url', type: 'text', name: 'feed', placeholder: 'Enter Experience URL : https://www.airbnb.co.in/experiences/101525' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Airbnb Feed*/
/*--Start--Create Capeterra Feed*/
function __taggbox__createCapeterraFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "68":
			__taggbox__feed_data.inputs = [{ label: 'Enter Capterra Company Page Url', type: 'text', name: 'feed', placeholder: 'Enter Capterra Company Page Url' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Capeterra Feed*/
/*--Start--Create Etsy Feed*/
function __taggbox__createEtsyFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	switch (__taggbox__feed_data.filterId) {
		case "69":
			__taggbox__feed_data.inputs = [{ label: 'Enter Shop Page Url', type: 'text', name: 'feed', placeholder: 'Enter Shop Page Url' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Etsy Feed*/
/*--Start--Create Tiktok Feed*/
function __taggbox__createTiktokFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
	switch (__taggbox__feed_data.filterId) {
		case "79":
			break;
		case "72":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__feed_data.filterId != 72) {
		if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
			__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Tiktok Feed*/
/*--Start--Create Vk Feed*/
function __taggbox__createVkFeed(__taggbox__feed_data) {
	let __taggbox__toast = new TaggboxToast;
	if (Object.keys(__taggbox__feed_data).length === 0)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*Already Exist Accounts*/
	switch (__taggbox__feed_data.filterId) {
		case "1":
			break;
		case "10":
			__taggbox__feed_data.inputs = [{ label: 'Search', id: '__taggbox__vk_communities', jsFunction: 'onkeyup="__taggbox__searchVkCommunities();"', type: 'text', name: 'feed', placeholder: 'Enter Communities Name', extraTag: 'search_option', inputLoader: 'vk_communities_search_loader' }, { id: '__taggbox__communities_id', type: 'hidden', name: 'communitiesId' }, { id: '__taggbox__communities_name', type: 'hidden', name: 'communitiesName' }];
			break;
		case "2":
			__taggbox__feed_data.inputs = [{ label: 'Hashtag', type: 'text', name: 'feed', placeholder: 'Enter Hashtag' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			return;
			break;
	}
	if (__taggbox__feed_data.filterId == 1) {
		let __taggbox__exist_auth = __taggbox__alreadyExistAuth();
		if (__taggbox__exist_auth.alreadyAuthOption.length > 0)
			__taggbox__feed_data.inputs = __taggbox__exist_auth.alreadyAuthOption.concat(__taggbox__feed_data.inputs);
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--Start-- Search Vk Communities*/
function __taggbox__searchVkCommunities() {
	let __taggbox__vk_communities = document.querySelector("#__taggbox__vk_communities").value;
	let __taggbox__search_option = document.querySelector("#__taggbox__search_option");
	let __taggbox__vk_communities_search_loader = document.querySelector("#__taggbox__vk_communities_search_loader");
	if (__taggbox__vk_communities && __taggbox__vk_communities.length > 2) {
		__taggbox__vk_communities_search_loader.style.display = 'block';
		/*__taggbox__search_option.innerHTML = '';*/
		let __taggbox__toast = new TaggboxToast;
		let formData = new FormData();
		formData.append('action', 'taggbox_data');
		formData.append('vkCommunitiesName', __taggbox__vk_communities);
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__search_vk_communities');
		fetch(__taggbox__ajax_url, {
			method: 'POST',
			headers: {
				'x-requested-with': 'XMLHttpRequest',
			},
			body: formData,
		}).then(response => {
			return response.json()
		}).then(response => {
			if (response.status == true) {
				let elemHTML = `<ul>`;
				if (response.data) {
					for (let index in response.data)
						elemHTML = `${elemHTML} <li onClick="__taggbox__manageVkCommunitiesData('${response.data[index].id}','${response.data[index].screen_name}')" value="${response.data[index].id}"> <img style="min-width:20px;max-width:20px;" src="${response.data[index].photo_100}" alt="image" />${response.data[index].screen_name}</li>`;
				} else {
					elemHTML = `${elemHTML} <li value="">Not Found</li>`;
				}
				elemHTML = `${elemHTML} </ul>`;
				__taggbox__search_option.innerHTML = elemHTML;
				__taggbox__vk_communities_search_loader.style.display = 'none';
			} else {
				__taggbox__search_option.innerHTML = '';
				__taggbox__vk_communities_search_loader.style.display = 'none';
				if (response.hasOwnProperty("message")) {
					__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
				} else {
					__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				}
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__search_option.innerHTML = '';
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			__taggbox__vk_communities_search_loader.style.display = 'none';
		});
	} else {
		__taggbox__search_option.innerHTML = '';
		__taggbox__vk_communities_search_loader.style.display = 'none';
	}
}
function __taggbox__manageVkCommunitiesData(__taggbox__communities_id, __taggbox__communities_name) {
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__communities_id || !__taggbox__communities_name)
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	document.querySelector("#__taggbox__vk_communities").value = __taggbox__communities_name;
	document.querySelector("#__taggbox__communities_id").value = __taggbox__communities_id;
	document.querySelector("#__taggbox__communities_name").value = __taggbox__communities_name;
	document.querySelector("#__taggbox__search_option").innerHTML = '';
}
/*--End-- Search Vk Communities*/
/*--End--Create Vk Feed*/
/*--Start--Create Amazon Feed*/
function __taggbox__createAmazonFeed(__taggbox__feed_data) {
	switch (__taggbox__feed_data.filterId) {
		case "77":
			__taggbox__feed_data.inputs = [{ label: 'Amazon Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.amazon.com/NUBWO-Wireless-Crystal-Clear-Microphone-Ergonomic/product-reviews/B08TBF4S42/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Amazon Feed*/
/*--Start--Create Tripadvisor Feed*/
function __taggbox__createTripadvisorFeed(__taggbox__feed_data) {
	switch (__taggbox__feed_data.filterId) {
		case "78":
			__taggbox__feed_data.inputs = [{ label: 'Tripadvisor Restaurant Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.tripadvisor.in/Restaurant_Review-g294013-d25147582-Reviews-Entrecote_Cafe_de_Paris_YAS_Mall-Abu_Dhabi_Emirate_of_Abu_Dhabi.html' }];
			break;
		case "80":
			__taggbox__feed_data.inputs = [{ label: 'Tripadvisor Hotel Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.tripadvisor.in/Hotel_Review-g294013-d953102-Reviews-Erth_Abu_Dhabi-Abu_Dhabi_Emirate_of_Abu_Dhabi.html' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Tripadvisor Feed*/
/*--Start--Create Aliexpress Feed*/
function __taggbox__createAliexpressFeed(__taggbox__feed_data) {
	switch (__taggbox__feed_data.filterId) {
		case "83":
			__taggbox__feed_data.inputs = [{ label: 'Aliexpress Product Url', type: 'text', name: 'feed', placeholder: 'Enter URL : https://www.aliexpress.com/item/1005005773831583.html' }];
			break;
		default:
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			document.querySelector("#__taggbox__feed_filters").selectedIndex = 0;
			break;
	}
	__taggbox__create_feed(__taggbox__feed_data);
}
/*--End--Create Aliexpress Feed*/

/*--Start--Manage Already Exist Accounts*/
function __taggbox__alreadyExistAuth(setOnlyParentNetwork = false) {
	/*--Start--Manage Already Exist Auth*/
	let alreadyAuthOption = [];
	if (__taggbox__network_already_exist_auth.hasOwnProperty("child") && Object.keys(__taggbox__network_already_exist_auth.child).length > 0 && !setOnlyParentNetwork) {
		for (let index in __taggbox__network_already_exist_auth.child) {
			alreadyAuthOption[index] = { name: __taggbox__network_already_exist_auth.child[index].accountName, value: __taggbox__network_already_exist_auth.child[index].id };
		}
		alreadyAuthOption = alreadyAuthOption.concat([{ name: 'Other', value: 0 }]);
		alreadyAuthOption = [{ label: 'Connected Accounts', id: '__taggbox__connected_accounts', type: 'select', name: 'authId', jsFunction: 'onChange="__taggbox__connectedAccountsOnChange();"', options: alreadyAuthOption }];
	} else if (__taggbox__network_already_exist_auth.hasOwnProperty("parent") && Object.keys(__taggbox__network_already_exist_auth.parent).length > 0) {
		for (let index in __taggbox__network_already_exist_auth.parent) {
			alreadyAuthOption[index] = { name: __taggbox__network_already_exist_auth.parent[index].accountName, value: __taggbox__network_already_exist_auth.parent[index].id };
		}
		alreadyAuthOption = alreadyAuthOption.concat([{ name: 'Other', value: 0 }]);
		alreadyAuthOption = [{ label: 'Connected Accounts', id: '__taggbox__connected_accounts', type: 'select', name: 'authId', jsFunction: 'onChange="__taggbox__connectedAccountsOnChange();"', options: alreadyAuthOption }];
	}
	return { alreadyAuthOption: alreadyAuthOption };
	/*--End--Manage Already Exist Auth*/
}
/*--Start-- Manage Data On Already Already Exist Accounts Change*/
function __taggbox__connectedAccountsOnChange() {
	let __taggbox__connected_accountsId = document.querySelector("#__taggbox__connected_accounts").selectedOptions[0].value;
	/*--Start-- Get Facebook Page Album*/
	let __taggbox__account_album_type = document.querySelector("#__taggbox__account_album_type");
	if (__taggbox__account_album_type) {
		if (__taggbox__connected_accountsId == 0) {
			let __taggbox__facebook_album_section = document.querySelector("#__taggbox__facebook_album_section");
			__taggbox__facebook_album_section.style.display = 'none';
			return;
		} else {
			__taggbox__facebook_album_section.style.display = 'block';
		}
		__taggbox__account_album_type = __taggbox__account_album_type.selectedOptions[0].value;
		if (__taggbox__account_album_type == 65) {
			__taggbox__getFacebookPageAlbums();
		}
	}
	/*--End-- Get Facebook Page Album*/
	/*--Start--Search Slack Chanel List On Account Change Change*/
	if (__taggbox__searchSlackChannelList)
		__taggbox__getSlackChannelList();
	/*--End--Search Slack Chanel List On Account Change Change*/
}
/*--End-- Manage Data On Already Already Exist Accounts Change*/
/*--End--Manage Already Exist Accounts*/
/*--Start-- Update Feed Status*/
function __taggbox__updateFeedStauts(count) {
	let __taggbox__feed = document.querySelector(`#feed_${count}`);
	let __taggbox__widget_id = __taggbox__feed.getAttribute('data-widgetId');
	let __taggbox__feed_id = __taggbox__feed.getAttribute('data-feedId');
	let __taggbox__feed_status = __taggbox__feed.getAttribute('data-feedStatus');
	/*Manage Toggel Botton On Space*/
	if (__taggbox__manageToggelOnPressSpace())
		return;
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__feed_id || !__taggbox__widget_id || !__taggbox__feed_status)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	/*confirmDialog({title: 'Yes, update feed status', message: 'Are you sure! do you want to update feed status?', buttonText: 'Update', type: 'warning'}, function () {*/
	let formData = new FormData();
	formData.append('feedId', __taggbox__feed_id);
	formData.append('widgetId', __taggbox__widget_id);
	formData.append('status', __taggbox__feed_status);
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__update_feed_status');
	__taggbox__open_loader();
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		__taggbox__close_loader();
		if (response.status == true) {
			if (response.data.hasOwnProperty("message")) {
				__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
			}
			/*Manage Feed Status*/
			switch (__taggbox__feed_status) {
				case '0':
					__taggbox__feed.setAttribute("data-feedStatus", '1');
					break;
				case '1':
					__taggbox__feed.setAttribute("data-feedStatus", '0');
					break;
				default:
					break;
			}

		} else {
			if (response.hasOwnProperty("message")) {
				__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
			} else {
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			}
		}
	}).catch((error) => {
		console.log(error);
		__taggbox__close_loader();
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	});
	/*});*/
}
/*--End-- Update Feed Status*/
/*--Start-- Delete Feed*/
function __taggbox__deleteFeed(__taggbox__feed_id, __taggbox__widget_id, __taggbox__feedbox_id) {
	let __taggbox__toast = new TaggboxToast;
	if (!__taggbox__feed_id || !__taggbox__widget_id || !__taggbox__feedbox_id)
		return __taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	confirmDialog({ title: 'Yes, delete feed', message: 'Are you sure! do you want to delete feed?', buttonText: 'Delete', type: 'danger' }, function () {
		let formData = new FormData();
		formData.append('feedId', __taggbox__feed_id);
		formData.append('widgetId', __taggbox__widget_id);
		formData.append('action', 'taggbox_data');
		formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
		formData.append('__taggbox__ajax_action', '__taggbox__delete_feed');
		__taggbox__open_loader();
		var __taggbox__toast = new TaggboxToast;
		fetch(__taggbox__ajax_url, {
			method: 'POST',
			headers: {
				'x-requested-with': 'XMLHttpRequest',
			},
			body: formData,
		}).then(response => {
			return response.json()
		}).then(response => {
			__taggbox__close_loader();
			if (response.status == true) {
				document.querySelector('#' + __taggbox__feedbox_id).remove();
				if (response.data.hasOwnProperty("message")) {
					__taggbox__toast.success({ message: response.data.message, position: '__taggbox__is-top-right' });
				}
			} else {
				if (response.hasOwnProperty("message")) {
					__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
				} else {
					__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
				}
			}
		}).catch((error) => {
			console.log(error);
			__taggbox__close_loader();
			__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
		});
	});
}
/*--End-- Delete Feed*/
/*--Start-- Get Creadet Feed*/
window.addEventListener ? window.addEventListener("load", __taggbox__getFeed, false) : window.attachEvent && window.attachEvent("onload", __taggbox__getFeed);
function __taggbox__getFeed() {
	/*if (__taggbox__manageApiCall())
	 return;*/
	/*Manage Copy Embed Code Section*/
	let __taggbox__copycode = document.getElementById("__taggbox__copycode");
	/*Manage Widget Error*/
	let widgetData = document.querySelector("#__taggbox__widgets").selectedOptions[0];
	let __taggbox__widgetId = widgetData.value.split('#')[0];
	let __taggbox__feed = document.getElementById("__taggbox__feed");
	let __taggbox__feed_data = document.getElementById("__taggbox__feed_data");

	let __taggbox__toast = new TaggboxToast;
	let formData = new FormData();
	formData.append('action', 'taggbox_data');
	formData.append('__taggbox__ajax_call_nones', __taggbox__ajax_call_nones);
	formData.append('__taggbox__ajax_action', '__taggbox__get_feed');
	formData.append('widgetId', __taggbox__widgetId);
	__taggbox__open_loader();
	fetch(__taggbox__ajax_url, {
		method: 'POST',
		headers: {
			'x-requested-with': 'XMLHttpRequest',
		},
		body: formData,
	}).then(response => {
		return response.json()
	}).then(response => {
		if (response.status == true) {
			__taggbox__close_loader();
			if (response.data.length > 0) {
				let elemHTML = `<ul class="__taggbox__conacclist">`;
				let count = 1;
				let __taggbox__feedbox_id = '__taggbox__feedbox_id';
				for (let index in response.data) {
					__taggbox__feedbox_id = __taggbox__feedbox_id + count;
					elemHTML = `${elemHTML}<li id="${__taggbox__feedbox_id}">`;
					elemHTML = `${elemHTML}<div class="__taggbox__checkbox __taggbox__reconninn">`;
					elemHTML = `${elemHTML}<div class="__taggbox__feediconame"><label><img class="" src="${__taggbox__plugin_url_for_js}assets/images/network/${response.data[index].Feed.networkId}.png"/></label>`;
					elemHTML = `${elemHTML}<span title="${response.data[index].Feed.name}"><img class="" src="${response.data[index].Filter.image}"/> <b>${response.data[index].Feed.name} : ${response.data[index].Filter.name}</b></span></div>`;
					if (response.data[index].Feed.api == 3 || response.data[index].Feed.api == 4)
						elemHTML = `${elemHTML}<div class="__taggbox__conn__actions"><a class="__taggbox__btn_reconn" href="javascript:void(0);" onclick="__tageembed__addUpdateAndRefreshAccount(${response.data[index].Feed.networkId},'reconnect','${response.data[index].Feed.accountId}',${response.data[index].Feed.id},${response.data[index].Feed.filterId},'${response.data[index].Feed.name}');"><i class="fas fa-redo-alt"></i> ${response.data[index].Feed.api == 3 ? 'Connect' : 'Reconnect'} </a></div>`;
					elemHTML = `${elemHTML}</div>`;
					elemHTML = `${elemHTML}<div class="__taggbox__mod__actions">`;
					elemHTML = `${elemHTML}<div class="__taggbox__status">`;
					elemHTML = `${elemHTML}<div class="__taggbox__toggleOnBut __taggbox__switch tooltip">`;
					elemHTML = `${elemHTML}<div class="__taggbox__onoffswitch">`;
					elemHTML = `${elemHTML}<input data-widgetId="${response.data[index].Feed.wallId}" data-feedId="${response.data[index].Feed.id}"  data-feedStatus="${response.data[index].Feed.status}"  id="feed_${count}" name="feed_${count}"  onchange="__taggbox__updateFeedStauts(${count});" type="checkbox"  class="__taggbox__onoffswitch-checkbox __taggbox__updateStatus" data-on-color="#009385" data-off-color="#989898" ${(response.data[index].Feed.status == 1) ? 'checked' : ''}>`;
					elemHTML = `${elemHTML}<label class="__taggbox__onoffswitch-label" for="feed_${count}">`;
					elemHTML = `${elemHTML}<span class="__taggbox__onoffswitch-inner"></span>`;
					elemHTML = `${elemHTML}<span class="__taggbox__onoffswitch-switch"style="background: rgb(152, 152, 152);"></span>`;
					elemHTML = `${elemHTML}</label></div>`;
					elemHTML = `${elemHTML}<span class="tooltiptext">Status</span>`;
					elemHTML = `${elemHTML}</div></div>`;
					elemHTML = `${elemHTML}<div class="__taggbox__totalpostcount">`;
					elemHTML = `${elemHTML}Total Post <span>${response.data[index].Feed.totalPost}</span>`;
					elemHTML = `${elemHTML}</div>`;
					elemHTML = `${elemHTML}<div class="__taggbox__moderation">`;
					elemHTML = `${elemHTML}<a class="__taggbox__btn__trash" onclick="__taggbox__deleteFeed(${response.data[index].Feed.id},${response.data[index].Feed.wallId},'${__taggbox__feedbox_id}');" href="javascript:void(0);"><i class="fas fa-trash" aria-hidden="true"></i></a>`;
					elemHTML = `${elemHTML}</div></div></li>`;
					count++;
				}
				elemHTML = `${elemHTML}</ul>`;
				__taggbox__feed.style.display = 'flex';
				__taggbox__feed_data.innerHTML = elemHTML;
				__taggbox__copycode.style.display = 'flex';
				/*Manage Next And Back Link section Section*/
				manageNextAndBackLinkSectionHideShow('block');
			} else {
				__taggbox__feed_data.innerHTML = '';
				__taggbox__feed.style.display = 'none';
				__taggbox__copycode.style.display = 'none';
				/*Manage Next And Back Link section Section*/
				manageNextAndBackLinkSectionHideShow('none');
			}
		} else {
			__taggbox__close_loader();
			__taggbox__feed_data.innerHTML = '';
			__taggbox__feed.style.display = 'none';
			__taggbox__copycode.style.display = 'none';
			/*Manage Next And Back Link section Section*/
			manageNextAndBackLinkSectionHideShow('none');
			if (response.hasOwnProperty("message")) {
				__taggbox__toast.danger({ message: response.message, position: '__taggbox__is-top-right' });
			} else {
				__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
			}
		}
	}).catch((error) => {
		console.log(error);
		__taggbox__close_loader();
		__taggbox__feed_data.innerHTML = '';
		__taggbox__feed.style.display = 'none';
		__taggbox__copycode.style.display = 'none';
		/*Manage Next And Back Link section Section*/
		manageNextAndBackLinkSectionHideShow('none');
		__taggbox__toast.danger({ message: "Something went wrong. Please try after sometime", position: '__taggbox__is-top-right' });
	});
}
/*--End-- Get Creadet Feed*/
/*--Start-- Manage Next And Back Link Hide Show*/
function manageNextAndBackLinkSectionHideShow(hideShow) {
	/*Manage Next And Back Link section Section*/
	let __taggbox__next_and_back_link_section = document.getElementById("__taggbox__next_and_back_link_section");
	if (__taggbox__next_and_back_link_section)
		__taggbox__next_and_back_link_section.style.display = hideShow;
}
/*--End-- Manage Next And Back Link Hide Show*/
