package com.infineit.aws;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JobController {
	
	@RequestMapping("/")
    public String initScreen(){
        return "jobList";
    }
	
	@RequestMapping("/newJob")
	public String newJobScreen(){
		return "newJob";
	}
	
	@RequestMapping("/jobCard")
	public String jobCardScreen(){
		return "jobCard";
	}

}
