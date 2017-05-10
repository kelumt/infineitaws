package com.infineit.aws;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner{
	
	private final JobRepository jobRepository;
	
	@Autowired
	public DatabaseLoader(JobRepository jobRepository){
		this.jobRepository = jobRepository;
	}
	
	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		Job job1 = new Job("Subaru Forester Major Service");
		job1.addSubJob(new SubJob("Check Oil"));
		job1.addSubJob(new SubJob("Check Break"));
		job1.addSubJob(new SubJob("Check Gas"));
		job1.addSubJob(new SubJob("Check Tyres"));
		
		
		this.jobRepository.save(job1);
		this.jobRepository.save(new Job("Suspension Upgrade Land Cruiser"));
		this.jobRepository.save(new Job("Road Worthy Jeep Wrnagler"));
		this.jobRepository.save(new Job("Dump Maruti Zuzuki"));
	}

}
