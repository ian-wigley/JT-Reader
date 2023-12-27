#pragma once
class LogicalSceneGraphNode
{
public:
	LogicalSceneGraphNode(void);
	~LogicalSceneGraphNode(void);
	void populateData(void);
private:
	void traverseLSG(void);
};

