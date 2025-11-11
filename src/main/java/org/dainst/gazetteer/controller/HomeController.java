package org.dainst.gazetteer.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@Value("${version}")
	private String version;

	@RequestMapping(value = "/")
	public ModelAndView home() {
		return new ModelAndView("redirect:app/#!/home");
	}

	@RequestMapping(value = "/robots.txt", method = RequestMethod.GET)
	@ResponseBody
	public String getRobots(HttpServletRequest request) {
		return "User-agent: *\nAllow: /";
	}
}
