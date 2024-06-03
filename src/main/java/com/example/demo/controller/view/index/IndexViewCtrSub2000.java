package com.example.demo.controller.view.index;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequestMapping(path = {"/", "/index"})
public class IndexViewCtrSub2000 {
    @GetMapping(path = {"sub2000"})
    public String getSub2000(Model model) {
        return "index/sub2000/sub2000";
    }

}
