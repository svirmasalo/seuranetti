import React from 'react';
import ReactDOM from 'react-dom';

/**
Data model
==========

author: 1
categories: Array [ 30 ]
comment_status: "open"
content: Object { rendered: "", protected: false }
date: "2017-11-13T17:35:32"
date_gmt: "2017-11-13T15:35:32"
excerpt: Object { rendered: "", protected: false }
featured_media: 0
format: "standard"
guid: Object { rendered: "https://dev.svirmasalo.fi/vconnect/?p=56" }
id: 56
link: "https://dev.svirmasalo.fi/vconnect/2017/11/13/asiakirja-1/"
meta: Array []
modified: "2017-11-13T17:35:32"
modified_gmt: "2017-11-13T15:35:32"
ping_status: "open"
slug: "asiakirja-1"
status: "publish"
sticky: false
tags: Array []
template: ""
title: Object { rendered: "Asiakirja 1" }
type: "post"

===========
**/

const ParsedContent = function(props){
	const raw = props.raw;
	return <div className="single-content" dangerouslySetInnerHTML={{__html:raw}}></div>;
}

const Single = function(props){
	const post = props.data;
	const title = props.name;
	return(
		<div className="view-wrapper single card">
			<header className="single-header">
				<div className="single-header--title">
					<h2>Artikkeli: {title} </h2>
				</div>
				<div className="single-header--meta">
					<ul>
						<li><small>Julkaistu: {post.date}</small></li>
						<li><small>Julkaissut: {post.author}</small></li>
					</ul>
				</div>
			</header>
			<ParsedContent raw={post.content.rendered}/> 
			<footer className="single-footer">
				<a className="btn default" href="#">Takaisin</a>
			</footer>
		</div>
	)
}


export {Single};