package com.example.demo.controller.view.index;

import com.example.demo.entities.JsConfig;
import com.example.demo.entities.client.index.sub1000.PostSub1000Req;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
@RequestMapping(path = {"/", "/index"})
public class IndexViewCtrSub1000 {
    @GetMapping(path = {"", "sub1000"})
    public String getSub1000(Model model) {
        JsConfig _jsConfig = new JsConfig();

        model.addAttribute("jsConfig", _jsConfig);

        _jsConfig.setPath("IndexSub1000");

        return "index/sub1000/sub1000";
    }

    @PostMapping(path = {"sub1000"})
    public String postSub1000(Model model, @ModelAttribute PostSub1000Req req) {
        model.addAttribute("req", req);

        return "redirect:/sub2000";
    }

}
