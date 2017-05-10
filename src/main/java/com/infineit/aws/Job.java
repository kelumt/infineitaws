package com.infineit.aws;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "jobs")
public class Job {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "job_id")
	private long id;
	
	private String description;
	
	@OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
	private Set<SubJob> subJobList;

	public Job() {}

	public Job(String description) {
		this.description = description;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public Set<SubJob> getSubJobList() {
		return subJobList;
	}

	public void setSubJobList(Set<SubJob> subJobList) {
		this.subJobList = subJobList;
	}
	
	public void addSubJob(SubJob subJob){
		if (subJobList == null) {
			subJobList = new HashSet<>();
		}
		subJob.setJob(this);
		subJobList.add(subJob);
	}
	
	
	
}
