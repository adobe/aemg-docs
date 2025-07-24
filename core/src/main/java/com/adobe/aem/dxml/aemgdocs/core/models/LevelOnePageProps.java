package com.adobe.aem.dxml.aemgdocs.core.models;
        

import com.adobe.cq.wcm.core.components.models.Component;
import org.osgi.annotation.versioning.ConsumerType;

import java.util.List;
import java.util.Map;
import java.util.Set;

@ConsumerType
public interface LevelOnePageProps extends Component {
    List<String> getLevelPageProperties();

    List<String> getUniquePropList();
}

// core\src\main\java\com\adobe\aem\dxml\aemgdocs\core\models\GuidesNavigation.java
