package com.leichu.topo.explore.web;

import com.leichu.topo.explore.model.TopoData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/topo")
public class TopoController {

	@GetMapping("data")
	public TopoData get() {
		return new TopoData();
	}


}
